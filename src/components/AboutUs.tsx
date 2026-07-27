import React from "react";
import { Sparkles, Bot, Zap, Database, ShieldCheck, ArrowRight, Cpu, Layers, Star } from "lucide-react";

export const AboutUs: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Mission Hero Banner */}
      <section className="bg-emerald-300 border-4 border-slate-900 p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
          <Cpu className="w-96 h-96 text-slate-900" />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <span className="text-xs font-mono font-black text-slate-900 bg-white border-2 border-slate-900 px-3 py-1 uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <Star className="w-3.5 h-3.5 fill-yellow-300 text-slate-900 stroke-[2]" /> THE PURPLE CLONE MANIFESTO
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display mt-6 leading-[1.15] uppercase">
            WE CLONE COMPLEXITY, SO YOU CAN SCALE CREATIVITY.
          </h2>
          
          <p className="text-slate-900 font-medium text-base sm:text-lg leading-relaxed mt-4 max-w-2xl">
            Purple Clone designs, trains, and deploys high-fidelity agentic architectures and automated systems. We translate chaotic human procedures into deterministic machine loops, ensuring your business scaling remains secure, rapid, and hands-free.
          </p>
        </div>
      </section>

      {/* 2. Bento Grid of Core Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Autonomous AI Agents */}
        <div className="bg-white border-2 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-indigo-100 border-2 border-slate-900 flex items-center justify-center text-slate-900 mb-5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Agentic AI Apps</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1 mb-3">Goal-Oriented AI</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              We deploy custom-trained autonomous agents capable of managing live customer channels, querying backend databases, booking calls, and self-correcting when unexpected events interrupt their routines.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-mono font-black text-indigo-600 uppercase">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Workflow Automation */}
        <div className="bg-white border-2 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-yellow-200 border-2 border-slate-900 flex items-center justify-center text-slate-900 mb-5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Zap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Workflow Automation</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1 mb-3">Deterministic Pipelines</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              Eliminate glue-code and flaky API integrations. We architect self-healing data synchronization loops between your core CRM, databases, proprietary webhooks, and third-party SaaS pipelines.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-mono font-black text-indigo-600 uppercase">
            <span>Review Pipelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Deep Extraction OCR */}
        <div className="bg-white border-2 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-rose-100 border-2 border-slate-900 flex items-center justify-center text-slate-900 mb-5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Database className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Cognitive Parsing</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1 mb-3">Structured Intelligence</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              Convert raw business documentation into clean, validated JSON schemas automatically. Purple Clone OCR pipelines achieve exceptional accuracy on messy PDFs, spreadsheets, and emails.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-mono font-black text-indigo-600 uppercase">
            <span>Explore SDKs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* 3. Operational Advantages Row */}
      <section className="bg-white border-2 border-slate-900 p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-display mb-6">Why Enterprises Trust Purple Clone</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="p-1.5 bg-yellow-300 border border-slate-900 h-8 w-8 flex items-center justify-center text-slate-900 shrink-0 font-bold font-mono">1</div>
              <div>
                <h4 className="text-base font-black text-slate-900">100% Data Sovereignty</h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  We deploy models within your cloud containers (Google Cloud Run, AWS, or local physical clusters). Your corporate knowledge base never feeds public LLM pools.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-1.5 bg-yellow-300 border border-slate-900 h-8 w-8 flex items-center justify-center text-slate-900 shrink-0 font-bold font-mono">2</div>
              <div>
                <h4 className="text-base font-black text-slate-900">Resilient Exception Handling</h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  Unlike fragile, basic API triggers, our pipelines use automated retry loops, schema validations, and fallback states to ensure 99.9% up-time under extreme loads.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="p-1.5 bg-yellow-300 border border-slate-900 h-8 w-8 flex items-center justify-center text-slate-900 shrink-0 font-bold font-mono">3</div>
              <div>
                <h4 className="text-base font-black text-slate-900">Custom Tool-Use Integration</h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  We teach our agents how to interact with your specific custom internal APIs, legacy database setups, ERP solutions, and corporate communications systems.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-1.5 bg-yellow-300 border border-slate-900 h-8 w-8 flex items-center justify-center text-slate-900 shrink-0 font-bold font-mono">4</div>
              <div>
                <h4 className="text-base font-black text-slate-900">Transparent Pricing & Lifecycles</h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  From freemium sandbox integrations to heavy full-enterprise white labels, track operational costs, limits, and live metrics within our developer pipeline portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Redirection Call to Action */}
      <section className="bg-violet-300 border-4 border-slate-900 p-8 text-center shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-display mb-2">Ready to hyper-automate?</h3>
        <p className="text-xs text-slate-800 font-mono font-bold uppercase tracking-wider mb-5">Talk with a Purple Clone Automation Architect today.</p>
        <span className="text-sm font-medium text-slate-900 block max-w-md mx-auto leading-relaxed mb-6">
          We will analyze your manual steps, design custom agent loops, and present a complete technical execution plan under 48 hours.
        </span>
      </section>
    </div>
  );
};
