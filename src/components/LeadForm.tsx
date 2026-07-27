import React, { useState } from "react";
import { X, Check, Mail, Briefcase, DollarSign, Send, MessageSquare } from "lucide-react";
import { AppItem, Lead } from "../types";

interface LeadFormProps {
  app: AppItem | null; // null represents general inquiry
  onClose: () => void;
  onSubmitSuccess: (newLead: Lead) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ app, onClose, onSubmitSuccess }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !message) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: app ? app.id : "general",
          appName: app ? app.name : "General Inquiry",
          clientName,
          clientEmail,
          clientCompany,
          message,
          value: value ? Number(value) : 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      const newLead = await response.json();
      setIsSuccess(true);
      setTimeout(() => {
        onSubmitSuccess(newLead);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        id="lead-form-modal"
        className="bg-white border-4 border-slate-900 rounded-none shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] max-w-lg w-full overflow-hidden transition-all duration-300 relative"
      >
        {/* Absolute Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-900 hover:bg-slate-100 p-1.5 border-2 border-slate-900 rounded-none transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
            <div className="w-16 h-16 bg-emerald-400 text-slate-900 border-2 border-slate-900 rounded-none flex items-center justify-center mb-4 animate-bounce shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-display uppercase tracking-tight">Inquiry Logged!</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xs mx-auto font-medium">
              We have successfully registered your interest in our lead pipeline and will reply within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 border-2 border-slate-900 px-3 py-1 uppercase tracking-wider">
                {app ? "Product Inquiry" : "Bespoke SaaS Custom Service"}
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-4 font-display uppercase tracking-tight">
                {app ? `Get ${app.name}` : "Request Tailored Platform"}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-2">
                {app 
                  ? "Interested in full white-label licenses, setup guides, or localized hosting options? Send your details."
                  : "Let's plan and construct robust system platforms matching your precise business metrics."}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 border-2 border-red-900 text-xs font-bold rounded-none">
                {error}
              </div>
            )}

            {/* Fields Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-3 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full pl-3 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-900 font-bold">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                  Estimated Project Value / Budget (USD)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-900 font-black text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="e.g. 1500"
                    className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-mono font-bold"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">Helps us validate deployment scale immediately.</p>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                  Your Requirements or Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your goals, tech stack requests, or license parameters..."
                  className="w-full p-3.5 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all resize-none font-medium leading-relaxed"
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-emerald-400 hover:bg-emerald-500 disabled:bg-slate-300 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {isSubmitting ? (
                  "Submitting Request..."
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
