"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState(1);
  return (
    <main>
      <h2>Admin</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input placeholder="Titre mission" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" value={weight} onChange={e => setWeight(parseInt(e.target.value || '0', 10))} />
        <button style={{ padding: 10, borderRadius: 8, background: '#9a4dff' }}>Créer mission (mock)</button>
        <button style={{ padding: 10, borderRadius: 8, background: '#4d5cff' }}>Distribuer (mock)</button>
      </div>
    </main>
  );
}

