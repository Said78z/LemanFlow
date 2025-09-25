"use client";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <main>
      <h2>Connexion</h2>
      <p>zkLogin (Google/Apple) — flux mocké pour MVP. Bouton ci-dessous.</p>
      <button
        onClick={() => setLoading(!loading)}
        style={{ padding: 12, borderRadius: 8, background: "#6c63ff" }}
      >
        {loading ? "Connexion..." : "Se connecter avec Google (demo)"}
      </button>
    </main>
  );
}

