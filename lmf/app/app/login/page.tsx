"use client";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <main>
      <div className="card p-8 space-y-4">
        <h2 className="text-xl font-semibold">Connexion</h2>
        <p className="opacity-80">zkLogin (Google/Apple) — flux mocké pour MVP. Bouton ci-dessous.</p>
        <button onClick={() => setLoading(!loading)} className="button-primary">
          {loading ? "Connexion..." : "Se connecter avec Google (demo)"}
        </button>
      </div>
    </main>
  );
}

