import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Bot, Zap, Database, HelpCircle, Loader2 } from "lucide-react";
import { AppItem } from "../types";

interface ContactUsProps {
  onSubmissionSuccess?: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onSubmissionSuccess }) => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>("general");
  
  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [message, setMessage] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("1500");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch apps for the dropdown selector
  useEffect(() => {
    fetch("/api/apps")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load catalog");
        return res.json();
      })
      .then((data) => setApps(data))
      .catch((err) => console.error("Error loading apps in Contact Us form:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !message.trim()) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const targetApp = apps.find(a => a.id === selectedAppId);
    const appName = targetApp ? targetApp.name : "General Inquiry";

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: selectedAppId,
          appName: appName,
          clientName,
          clientEmail,
          clientCompany,
          message,
          value: parseFloat(estimatedValue) || 0,
          notes: "Inquiry generated from the Public Contact Us portal."
        }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error during submission.");
      }

      setIsSuccess(true);
      setClientName("");
      setClientEmail("");
      setClientCompany("");
      setMessage("");
      setSelectedAppId("general");
      
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      {/* LEFT COLUMN: Contact Coordinates (5 cols on lg) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Coordinate Panel */}
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6">
          <div>
            <span className="text-[10px] font-mono font-black text-indigo-600 uppercase tracking-widest block">HEADQUARTERS</span>
            <h3 className="text-2xl font-black text-slate-900 font-display uppercase tracking-tight mt-1">THE CLONE HUB</h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Let's bypass long discovery sessions. Speak directly with an engineer who writes code, fine-tunes models, and wires pipelines. Contact us to schedule a sandbox deployment or request custom services.
          </p>

          <div className="border-t-2 border-slate-900 pt-6 space-y-4">
            {/* Coordinate items */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-300 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
                <MapPin className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase block">Global Coordinates</span>
                <span className="text-xs font-bold text-slate-800">Niketan, Marg Dillibazar Kathmandu, Nepal</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-300 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
                <Mail className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase block">Email</span>
                <a href="mailto:mail@pctech.com.np" className="text-xs font-bold text-slate-800 underline hover:text-indigo-600">
                  mail@pctech.com.np
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-rose-200 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
                <Phone className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase block">Phone</span>
                <span className="text-xs font-bold text-slate-800">+977 9701011225</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Systems Dashboard status widget */}
        <div className="bg-slate-900 text-white p-6 border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ROUTING SYSTEMS ONLINE
            </span>
            <span className="text-[10px] font-mono text-slate-400">LATENCY: 14MS</span>
          </div>
          <h4 className="text-sm font-bold uppercase font-display tracking-tight text-white">CRM Integration Active</h4>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">
            Submitting this form immediately routes details to our active CRM database. You can inspect the logs directly by logging into the Login view.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Contact Form (7 cols on lg) */}
      <div className="lg:col-span-7">
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 font-display uppercase tracking-tight">ENGAGE ARCHITECTS</h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">Request specialized setups & workflows</p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 border-2 border-slate-900 p-6 text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] my-6">
              <div className="w-12 h-12 bg-emerald-400 border-2 border-slate-900 flex items-center justify-center text-slate-900 mx-auto shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <CheckCircle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-black text-slate-900 font-display uppercase">INQUIRY LOGGED SUCCESSFULLY!</h4>
              <p className="text-xs text-slate-700 font-medium max-w-md mx-auto leading-relaxed">
                Your request has been indexed into our persistent Lead pipeline as a "New" ticket. You can authenticate into the Login tab to manage and update its status immediately!
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-4 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border-2 border-rose-900 text-rose-900 text-xs font-bold font-mono">
                  ERROR: {errorMessage}
                </div>
              )}

              {/* Grid 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sterling Cooper"
                    className="w-full px-3 py-2 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. sterling@agency.com"
                    className="w-full px-3 py-2 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Grid 2: Company and Project budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Cooper Inc."
                    className="w-full px-3 py-2 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                    Project Allocation Budget (USD)
                  </label>
                  <select
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0"
                  >
                    <option value="1500">$1,000 - $3,000 Sandbox Integration</option>
                    <option value="5000">$3,000 - $8,000 Custom AI Workflow</option>
                    <option value="15000">$10,000 - $25,000 Full Agent Architecture</option>
                    <option value="50000">$25,000+ Enterprise Solution</option>
                  </select>
                </div>
              </div>

              {/* Dropdown: Target Service/App Inquiry */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                  Target Service / System Blueprint
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0"
                >
                  <option value="general">Bespoke Consulting Services (General Inquiry)</option>
                  {apps.map((app) => (
                    <option key={app.id} value={app.id}>
                      Configure: {app.name} ({app.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea: Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-wider">
                  Describe Your Operational Bottlenecks *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline which manual data movements or repetitive customer/extraction tasks you wish to automate with Purple Clone."
                  className="w-full px-3 py-2 text-xs border-2 border-slate-900 bg-slate-50 font-medium focus:bg-white focus:outline-none focus:ring-0 resize-none"
                ></textarea>
              </div>

              {/* Form submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-yellow-300 hover:bg-yellow-400 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[3px] hover:translate-y-[3px] disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:translate-x-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
