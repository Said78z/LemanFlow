"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState(1);
  const [resp, setResp] = useState<string | null>(null);

  async function createMission() {
    const body = { mission_id: Math.floor(Math.random() * 100000), meta: title || 'Mission', start_ms: Date.now(), end_ms: Date.now() + 86400000, weight };
    const res = await fetch('http://localhost:3001/missions/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    setResp(JSON.stringify(data));
  }
  return (
    <main>
      <div className="card p-6 space-y-3 max-w-lg">
        <h2 className="text-xl font-semibold">Admin</h2>
        <input className="bg-black/30 rounded p-2 w-full" placeholder="Titre mission" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="bg-black/30 rounded p-2 w-full" type="number" value={weight} onChange={e => setWeight(parseInt(e.target.value || '0', 10))} />
        <div className="flex gap-2">
          <button className="button-primary" onClick={createMission}>Créer mission</button>
          <button className="button-primary">Distribuer (mock)</button>
        </div>
        {resp && <pre className="whitespace-pre-wrap text-xs opacity-80">{resp}</pre>}
      </div>
    </main>
  );
}

