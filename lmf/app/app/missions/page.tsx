"use client";
import { useEffect, useState } from "react";

type Mission = { id: number; title: string; start_ms: number; end_ms: number; weight: number };

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  useEffect(() => {
    setMissions([
      { id: 1, title: "Onboard", start_ms: Date.now() - 1000, end_ms: Date.now() + 86400000, weight: 1 },
      { id: 2, title: "Build", start_ms: Date.now() - 1000, end_ms: Date.now() + 86400000, weight: 2 },
    ]);
  }, []);
  return (
    <main>
      <h2>Missions</h2>
      <ul>
        {missions.map(m => (
          <li key={m.id} style={{ margin: '12px 0' }}>
            <strong>{m.title}</strong> • poids {m.weight}
          </li>
        ))}
      </ul>
    </main>
  );
}

