import React, { useState } from "react";
import { 
  Briefcase, Mail, Calendar, DollarSign, Edit3, Trash2, CheckCircle2, 
  MessageSquare, User, Filter, RefreshCw, X, ChevronDown, Check, Trash
} from "lucide-react";
import { Lead, LeadStatus } from "../types";

interface LeadManagerProps {
  leads: Lead[];
  onUpdateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  onDeleteLead: (id: string) => Promise<void>;
}

export const LeadManager: React.FC<LeadManagerProps> = ({ leads, onUpdateLead, onDeleteLead }) => {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Modal / Inline editing states
  const [editStatus, setEditStatus] = useState<LeadStatus>("New");
  const [editValue, setEditValue] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditValue(lead.value || 0);
    setEditNotes(lead.notes || "");
  };

  const handleSaveUpdates = async () => {
    if (!selectedLead) return;
    setIsSaving(true);
    try {
      await onUpdateLead(selectedLead.id, {
        status: editStatus,
        value: Number(editValue),
        notes: editNotes
      });
      
      // Update selected lead reference to reflect changes
      setSelectedLead({
        ...selectedLead,
        status: editStatus,
        value: Number(editValue),
        notes: editNotes
      });
    } catch (e) {
      alert("Error saving updates");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await onDeleteLead(id);
      setSelectedLead(null);
    }
  };

  // Filter logic
  const filteredLeads = leads.filter(l => {
    if (filterStatus === "All") return true;
    return l.status === filterStatus;
  });

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "New":
        return "bg-blue-300 text-slate-900 border-slate-900";
      case "Contacted":
        return "bg-violet-300 text-slate-900 border-slate-900";
      case "Qualified":
        return "bg-yellow-300 text-slate-900 border-slate-900";
      case "Proposal":
        return "bg-pink-300 text-slate-900 border-slate-900";
      case "Won":
        return "bg-emerald-400 text-slate-900 border-slate-900";
      case "Lost":
        return "bg-slate-200 text-slate-700 border-slate-900";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Leads Ledger (List Table) - Span 2 columns */}
      <div className="xl:col-span-2 bg-white border-2 border-slate-900 rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
        <div>
          {/* Header & Status Filter row */}
          <div className="p-5 border-b-2 border-slate-900 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg font-display uppercase tracking-tight">Inbound Lead Pipeline</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Manage and nurture active conversations with software buyers.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-900 font-black font-mono flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs font-bold bg-white border-2 border-slate-900 rounded-none px-2.5 py-1.5 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                <option value="All">All Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Leads table */}
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">
              <p className="text-sm">No leads match the selected stage filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-900 text-[10px] font-mono tracking-wider text-slate-900 uppercase">
                    <th className="py-3 px-5 font-black">Client Contact</th>
                    <th className="py-3 px-4 font-black">App Interest</th>
                    <th className="py-3 px-4 font-black">Deal Value</th>
                    <th className="py-3 px-4 font-black">Stage</th>
                    <th className="py-3 px-4 font-black text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-900 text-sm">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => handleSelectLead(lead)}
                      className={`hover:bg-indigo-50/40 cursor-pointer transition-colors ${
                        selectedLead?.id === lead.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-slate-900">{lead.clientName}</div>
                        <div className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                          {lead.clientCompany ? (
                            <>
                              <Briefcase className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[120px]">{lead.clientCompany}</span>
                            </>
                          ) : (
                            <>
                              <Mail className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[120px]">{lead.clientEmail}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-bold text-slate-800 px-2.5 py-0.5 bg-slate-100 border border-slate-900">
                          {lead.appName}
                        </span>
                        <div className="text-[10px] text-slate-400 font-bold font-mono mt-2">
                          {formatDate(lead.createdAt)}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-black font-mono text-slate-900">
                        ${lead.value ? lead.value.toLocaleString() : "0"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border-2 rounded-none ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleSelectLead(lead)}
                          className="p-1.5 hover:bg-slate-100 rounded-none border border-slate-900 text-slate-900 transition-colors bg-white shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Dynamic total feedback bottom bar */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-900 text-xs text-slate-600 font-bold font-mono flex items-center justify-between">
          <span>Showing {filteredLeads.length} of {leads.length} inquiries</span>
          <span>Core storage system: Persistent JSON DB</span>
        </div>
      </div>

      {/* Selected Lead Detail Editor Drawer (1 column) */}
      <div className="bg-white border-2 border-slate-900 rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        {selectedLead ? (
          <div className="space-y-5">
            {/* Lead Meta Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Client Details</span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">{selectedLead.clientName}</h3>
                <span className="text-xs text-slate-500 font-mono font-bold">{selectedLead.clientEmail}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-900 hover:bg-slate-100 p-1 border-2 border-slate-900"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Client Context Information */}
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 border-2 border-slate-900">
              {selectedLead.clientCompany && (
                <div className="flex items-center gap-2 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <strong>Company:</strong> {selectedLead.clientCompany}
                </div>
              )}
              <div className="flex items-center gap-2 font-bold">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <strong>Received:</strong> {formatDate(selectedLead.createdAt)}
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-200 mt-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="w-full">
                  <strong className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inquiry Requirements:</strong>
                  <p className="mt-1 text-xs text-slate-700 bg-white p-2 border border-slate-300 shadow-inner max-h-[100px] overflow-y-auto leading-relaxed font-medium">
                    "{selectedLead.message}"
                  </p>
                </div>
              </div>
            </div>

            {/* Lead Editing Fields */}
            <div className="space-y-4 pt-2">
              {/* Stage Selector Grid */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2 font-mono">
                  Advance Deal Stage
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {statuses.map((st) => {
                    const isActive = editStatus === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setEditStatus(st)}
                        className={`text-[10px] font-black uppercase tracking-wider py-1.5 px-2 text-center transition-all border-2 border-slate-900 ${
                          isActive
                            ? "bg-slate-900 text-white shadow-none"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Value */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                  Deal Contract Value ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-900 font-bold text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border-2 border-slate-900 focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-mono font-bold"
                  />
                </div>
              </div>

              {/* Private Admin Notes */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                  Private Notes (Admin Only)
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Needs localized custom license. Set price threshold to $1,200. Zoom demo is set for Friday morning."
                  className="w-full p-3 text-xs bg-slate-50 border-2 border-slate-900 focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] resize-none leading-relaxed font-medium"
                ></textarea>
              </div>
            </div>

            {/* Form actions: Update and Delete */}
            <div className="pt-4 border-t-2 border-slate-900 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleDelete(selectedLead.id)}
                className="px-3.5 py-2 hover:bg-red-50 text-red-600 border-2 border-transparent hover:border-red-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>

              <button
                type="button"
                onClick={handleSaveUpdates}
                disabled={isSaving}
                className="px-5 py-2 bg-emerald-400 hover:bg-emerald-500 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Save Updates
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center">
            <User className="w-8 h-8 text-slate-300 stroke-[2] mb-3" />
            <h4 className="text-sm font-black font-display uppercase text-slate-800 tracking-tight">No Lead Selected</h4>
            <p className="text-xs text-slate-500 font-medium max-w-[200px] mt-1.5 mx-auto leading-relaxed">
              Select any inquiry from the pipeline database to review clients, update pricing models, or log private project status notes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
