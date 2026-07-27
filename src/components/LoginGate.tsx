import React, { useState } from "react";
import { Lock } from "lucide-react";

interface LoginGateProps {
  onSuccess: () => void;
}

export function LoginGate({ onSuccess }: LoginGateProps) {
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "admin") {
      setLoginError("");
      onSuccess();
    } else {
      setLoginError("Invalid developer passcode. Try using 'admin'.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mt-10">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-yellow-300 text-slate-900 border-2 border-slate-900 flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <Lock className="w-5 h-5 stroke-[2.5]" />
        </div>
        <h3 className="text-2xl font-black font-display text-slate-900 uppercase tracking-tight">Developer Gate</h3>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          Enter your developer passcode to access pipeline leads, analytics, and showcase configuration.
        </p>
      </div>

      {loginError && (
        <div className="mb-4 p-3 bg-red-150 text-red-800 text-xs border-2 border-red-900 font-bold">
          {loginError}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
            Passcode
          </label>
          <input
            type="password"
            required
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="e.g. admin"
            className="w-full px-4 py-2.5 text-sm bg-slate-50 border-2 border-slate-900 focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-mono font-bold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[3px_3px_0px_0px_rgba(51,65,85,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(51,65,85,1)]"
        >
          Unlock Portal
        </button>
      </form>

      <div className="mt-6 pt-5 border-t-2 border-slate-200 text-center">
        <span className="text-[11px] text-slate-500 font-mono font-bold">
          💡 Hint: use <strong className="text-slate-900 underline">admin</strong> to login
        </span>
      </div>
    </div>
  );
}
