import { useState } from "react";
import { useLocation } from "wouter";
import { adminLogin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(username, password)) {
      navigate("/admin/orders");
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0a06] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-4">
            <span className="text-primary-foreground text-2xl">✦</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Mediona Admin</h1>
          <p className="text-neutral-500 text-sm mt-1">Sign in to access the dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1008] border border-neutral-800 rounded-2xl p-6 space-y-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              className="rounded-xl border border-neutral-700 bg-neutral-900 text-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-600"
              placeholder="admin"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="rounded-xl border border-neutral-700 bg-neutral-900 text-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-600"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
              Invalid username or password.
            </p>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
