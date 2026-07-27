import React from "react";

export function Footer() {
  return (
    <footer className="border-t-4 border-slate-900 bg-white py-8 px-4 sm:px-8 text-center text-xs text-slate-500 font-mono font-bold">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} <a href="https://www.purpleclone.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900">Purple Clone</a>. All sandbox systems fully operational.</span>
        <div className="flex gap-4">
          <a href="https://www.purpleclone.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 underline">purpleclone.com</a>
          <span>&middot;</span>
          <span className="hover:text-slate-900 cursor-pointer">Security Ledger</span>
          <span>&middot;</span>
          <span className="hover:text-slate-900 cursor-pointer">Storage JSON DB</span>
          <span>&middot;</span>
          <span className="hover:text-slate-900 cursor-pointer">Pure Core API</span>
        </div>
      </div>
    </footer>
  );
}
