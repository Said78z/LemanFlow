import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import { importPKCS8, SignJWT, importJWK, CompactSign, generateKeyPair } from 'jose';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

dotenv.config();

const server = Fastify({ logger: true });
await server.register(cors, { origin: true });

const env = z.object({
  SUI_RPC_URL: z.string().min(1),
  SPONSOR_PRIVATE_KEY: z.string().min(1),
  ORG_PRIVATE_KEY: z.string().min(1),
  PACKAGE_ID: z.string().min(1),
  CONFIG_ID: z.string().min(1).optional(),
}).parse(process.env);

const client = new SuiClient({ url: env.SUI_RPC_URL });

// Expect ORG_PRIVATE_KEY as PKCS8 PEM for ES256
async function signQR(payload: Record<string, unknown>): Promise<string> {
  const pkcs8 = env.ORG_PRIVATE_KEY;
  const alg = 'ES256';
  const key = await importPKCS8(pkcs8, alg);
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const sig = await new CompactSign(data).setProtectedHeader({ alg }).sign(key);
  return sig;
}

server.post('/qr/issue', async (request, reply) => {
  const bodySchema = z.object({ mission_id: z.number(), nonce: z.string(), exp: z.number() });
  const body = bodySchema.parse(request.body);
  const payload = { mission_id: body.mission_id, nonce: body.nonce, exp: body.exp };
  const sig = await signQR(payload);
  return { payload, sig };
});

// Sponsored transaction pattern:
// 1) If no userSignature provided, return txBytes to be signed client-side (zkLogin)
// 2) If userSignature provided, sponsor-sign and execute
server.post('/tx/claim', async (request, reply) => {
  const schema = z.object({
    pool: z.string().min(2),
    passport: z.string().min(2),
    mission_id: z.number(),
    proof_sig: z.string(),
    userSignature: z.string().optional(),
    txBytes: z.string().optional(),
  });
  const body = schema.parse(request.body);

  if (!body.userSignature) {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${env.PACKAGE_ID}::grants::claim_attestation`,
      arguments: [
        tx.object(body.pool),
        tx.object(body.passport),
        tx.pure.u64(body.mission_id),
        tx.pure.vector('u8', Buffer.from(body.proof_sig, 'hex')),
        tx.object('0x6'), // clock object
      ],
    });
    tx.setGasBudget(1_000_000_000);
    const txBytes = await tx.build({ client });
    return { txBytes };
  }

  // Execute with sponsor signature + provided user signature
  const sponsorKeypair = Ed25519Keypair.fromSecretKey(Buffer.from(env.SPONSOR_PRIVATE_KEY, 'base64'));
  const sponsorSig = sponsorKeypair.signTransactionBlock(Buffer.from(body.txBytes!, 'base64'));

  const exec = await client.executeTransactionBlock({
    transactionBlock: body.txBytes!,
    signature: [body.userSignature!, sponsorSig],
    options: { showEffects: true, showEvents: true },
    requestType: 'WaitForLocalExecution',
  });

  return exec;
});

server.get('/health', async () => ({ ok: true }));

const port = Number(process.env.PORT || 3001);
server.listen({ port, host: '0.0.0.0' });

