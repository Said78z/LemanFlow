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
      <div className="card p-6 space-y-3">
        <h2 className="text-xl font-semibold">Scanner QR</h2>
        <p className="opacity-80">Collez la signature QR ci-dessous (mock pour MVP).</p>
        <textarea value={qr} onChange={e => setQr(e.target.value)} className="w-full h-40 bg-black/30 rounded p-2" />
        <button onClick={submit} className="button-primary">Envoyer</button>
        {status && <pre className="whitespace-pre-wrap text-xs opacity-80">{status}</pre>}
      </div>
    </main>
  );
}

