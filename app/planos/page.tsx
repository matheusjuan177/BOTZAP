"use client";

import { useState } from "react";

export default function Planos() {
  const [loading, setLoading] = useState(false);

  async function assinar(priceId: string) {
    setLoading(true);
    const res = await fetch("/api/criar-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user_123", priceId }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <div>
      <h1>Escolha seu plano</h1>
      <button disabled={loading} onClick={() => assinar("price_1TnfzS6NyrsPuMPzPlUUH6b9")}>
        Plano Mensal
      </button>
    </div>
  );
}
