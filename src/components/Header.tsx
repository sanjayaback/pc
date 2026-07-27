import React from "react";
import { Terminal, Unlock, Lock } from "lucide-react";

interface HeaderProps {
  activeTab: "showcase" | "crm";
  setActiveTab: (tab: "showcase" | "crm") => void;
  isCrmAuthenticated: boolean;
}

export function Header({ activeTab, setActiveTab, isCrmAuthenticated }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b-4 border-slate-900 z-30 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo Brand Frame */}
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-indigo-500 border-2 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] shrink-0">
            <Terminal className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 font-black uppercase block">AGENTIC AUTOMATION PLATFORM</span>
            <h1 className="text-xl font-black font-display text-slate-900 tracking-tight leading-none mt-1">
              Purple Clone AI Showcase
            </h1>
          </div>
        </div>

        {/* View Tab Toggle - Neobrutalist buttons */}
        <div className="flex border-2 border-slate-900 p-1 bg-slate-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          <button
            id="tab-showcase"
            onClick={() => setActiveTab("showcase")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === "showcase"
                ? "bg-slate-900 text-white shadow-none"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Public Gallery
          </button>
          <button
            id="tab-crm"
            onClick={() => setActiveTab("crm")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === "crm"
                ? "bg-slate-900 text-white shadow-none"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {isCrmAuthenticated ? <Unlock className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> : <Lock className="w-3.5 h-3.5 stroke-[2.5]" />}
            Developer CRM
          </button>
        </div>
      </div>
    </header>
  );
}
