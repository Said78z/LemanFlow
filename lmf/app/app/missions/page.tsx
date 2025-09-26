"use client";
import { useEffect, useState } from "react";

type Mission = { id: number; title: string; start_ms: number; end_ms: number; weight: number };

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/missions").then(r => r.json()).then(data => {
      const mapped: Mission[] = (data.missions || []).map((m: any) => ({
        id: m.id,
        title: m.meta?.title || `Mission ${m.id}`,
        start_ms: m.start_ms,
        end_ms: m.end_ms,
        weight: m.reward_weight,
      }));
      setMissions(mapped);
    }).catch(() => setMissions([]));
  }, []);
  return (
    <main>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Missions</h2>
        <div className="grid gap-3">
          {missions.map(m => (
            <div key={m.id} className="card p-4">
              <div className="flex justify-between">
                <strong>{m.title}</strong>
                <span className="opacity-80">Poids {m.weight}</span>
              </div>
              <div className="opacity-70 text-sm">{new Date(m.start_ms).toLocaleString()} → {new Date(m.end_ms).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

