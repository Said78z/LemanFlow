"use client";
import { useState } from "react";

export default function ScanPage() {
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    setStatus("Submitting...");
    const res = await fetch("http://localhost:3001/tx/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pool: "0xPOOL", passport: "0xPASSPORT", mission_id: 1, proof_sig: qr }),
    });
    const data = await res.json();
    setStatus(JSON.stringify(data));
  }

  return (
    <main>
      <h2>Scanner QR</h2>
      <p>Collez la signature QR ci-dessous (mock pour MVP).</p>
      <textarea value={qr} onChange={e => setQr(e.target.value)} style={{ width: '100%', height: 120 }} />
      <button onClick={submit} style={{ marginTop: 12, padding: 12, borderRadius: 8, background: '#6c63ff' }}>Envoyer</button>
      {status && <pre style={{ whiteSpace: 'pre-wrap' }}>{status}</pre>}
    </main>
  );
}

