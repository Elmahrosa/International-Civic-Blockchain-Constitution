"use client";
import { useState } from "react";

export default function PiLoginIntegration() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  const login = async () => {
    // Stubbed login; replace with Pi SDK integration
    setUser({ username: "pi_pioneer_demo" });
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      {user ? (
        <span className="text-sm text-nile-blue">Signed in as {user.username}</span>
      ) : (
        <button
          className="border rounded px-3 py-1 text-sm bg-egyptian-gold text-hieroglyph hover:opacity-80"
          onClick={login}
        >
          Sign in with Pi
        </button>
      )}
    </div>
  );
}
