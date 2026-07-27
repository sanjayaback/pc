import React from "react";
import { DollarSign, Inbox, Percent, Flame, Layers } from "lucide-react";
import { Lead, AppItem } from "../types";

interface CrmAnalyticsProps {
  leads: Lead[];
  apps: AppItem[];
}

export const CrmAnalytics: React.FC<CrmAnalyticsProps> = ({ leads, apps }) => {
  // 1. Calculate Core Statistics
  const totalLeads = leads.length;
  
  // Pipeline Value = Sum of estimated values of leads (excluding "Lost" and "Won")
  const pipelineValue = leads
    .filter(l => l.status !== "Lost" && l.status !== "Won")
    .reduce((sum, l) => sum + (l.value || 0), 0);

  // Won Revenue = Sum of estimated value of "Won" leads
  const wonRevenue = leads
    .filter(l => l.status === "Won")
    .reduce((sum, l) => sum + (l.value || 0), 0);

  const activeNegotiations = leads.filter(
    l => l.status === "Contacted" || l.status === "Qualified" || l.status === "Proposal"
  ).length;

  // Win rate: Won / (Won + Lost)
  const resolvedLeads = leads.filter(l => l.status === "Won" || l.status === "Lost");
  const wonCount = leads.filter(l => l.status === "Won").length;
  const winRate = resolvedLeads.length > 0 
    ? Math.round((wonCount / resolvedLeads.length) * 100) 
    : 0;

  // 2. Prepare Data for Status Distribution
  const statuses: { label: string; count: number; color: string; barColor: string }[] = [
    { label: "New", count: leads.filter(l => l.status === "New").length, color: "bg-blue-300", barColor: "bg-blue-400" },
    { label: "Contacted", count: leads.filter(l => l.status === "Contacted").length, color: "bg-violet-300", barColor: "bg-violet-400" },
    { label: "Qualified", count: leads.filter(l => l.status === "Qualified").length, color: "bg-yellow-300", barColor: "bg-yellow-400" },
    { label: "Proposal", count: leads.filter(l => l.status === "Proposal").length, color: "bg-pink-300", barColor: "bg-pink-400" },
    { label: "Won", count: leads.filter(l => l.status === "Won").length, color: "bg-emerald-400", barColor: "bg-emerald-500" },
    { label: "Lost", count: leads.filter(l => l.status === "Lost").length, color: "bg-slate-300", barColor: "bg-slate-400" },
  ];

  // Max count for chart scaling
  const maxStatusCount = Math.max(...statuses.map(s => s.count), 1);

  // 3. Prepare Data for App Interest (Inquiries per app)
  const appInterest = apps.map(app => {
    const count = leads.filter(l => l.appId === app.id).length;
    const value = leads.filter(l => l.appId === app.id).reduce((sum, l) => sum + (l.value || 0), 0);
    return {
      name: app.name,
      count,
      value
    };
  });

  // Add General inquiries
  const generalCount = leads.filter(l => l.appId === "general").length;
  const generalValue = leads.filter(l => l.appId === "general").reduce((sum, l) => sum + (l.value || 0), 0);
  appInterest.push({ name: "General Inquiries", count: generalCount, value: generalValue });

  // Sort by count descending
  appInterest.sort((a, b) => b.count - a.count);
  const maxAppCount = Math.max(...appInterest.map(a => a.count), 1);

  return (
    <div className="space-y-6">
      {/* KPI Stats Grid - Bento Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Pipeline Value */}
        <div className="bg-yellow-300 border-2 border-slate-900 rounded-none p-5 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-800 tracking-wider font-extrabold bg-white border border-slate-900 px-2 py-0.5">Active Pipeline</span>
            <h4 className="text-3xl font-black text-slate-900 mt-3 font-display">
              ${pipelineValue.toLocaleString()}
            </h4>
            <span className="text-[10px] text-slate-700 font-mono mt-1 block font-bold">Unclosed contract bids</span>
          </div>
          <div className="p-3 bg-white border-2 border-slate-900 text-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* KPI 2: Won Revenue */}
        <div className="bg-emerald-400 border-2 border-slate-900 rounded-none p-5 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-900 tracking-wider font-extrabold bg-white border border-slate-900 px-2 py-0.5">Won Revenue</span>
            <h4 className="text-3xl font-black text-slate-900 mt-3 font-display">
              ${wonRevenue.toLocaleString()}
            </h4>
            <span className="text-[10px] text-slate-800 font-mono mt-1 block font-bold">Closed-Won developer deals</span>
          </div>
          <div className="p-3 bg-white border-2 border-slate-900 text-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
            <Flame className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* KPI 3: Inquiries */}
        <div className="bg-violet-300 border-2 border-slate-900 rounded-none p-5 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-800 tracking-wider font-extrabold bg-white border border-slate-900 px-2 py-0.5">Inbound Leads</span>
            <h4 className="text-3xl font-black text-slate-900 mt-3 font-display">
              {totalLeads}
            </h4>
            <span className="text-[10px] text-slate-700 font-mono mt-1 block font-bold">{activeNegotiations} active discussions</span>
          </div>
          <div className="p-3 bg-white border-2 border-slate-900 text-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
            <Inbox className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* KPI 4: Win Rate */}
        <div className="bg-orange-300 border-2 border-slate-900 rounded-none p-5 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-800 tracking-wider font-extrabold bg-white border border-slate-900 px-2 py-0.5">Conversion</span>
            <h4 className="text-3xl font-black text-slate-900 mt-3 font-display">
              {winRate}%
            </h4>
            <span className="text-[10px] text-slate-700 font-mono mt-1 block font-bold">Resolved deal win rate</span>
          </div>
          <div className="p-3 bg-white border-2 border-slate-900 text-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0">
            <Percent className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Pipeline stage distribution */}
        <div className="bg-white border-2 border-slate-900 rounded-none p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display">Deal Stage Funnel</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 mb-6">Distribution of inquiries across CRM lifecycle phases.</p>
            
            <div className="space-y-4">
              {statuses.map((stat, idx) => {
                const percent = Math.round((stat.count / maxStatusCount) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-none border border-slate-900 ${stat.color}`}></span>
                        {stat.label}
                      </span>
                      <span className="font-mono text-slate-600 font-extrabold">{stat.count} leads</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 border-2 border-slate-900 rounded-none overflow-hidden">
                      <div 
                        className={`h-full rounded-none transition-all duration-500 ${stat.barColor}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200 text-[10px] text-slate-400 font-mono font-bold flex items-center gap-1">
            <span>* Normalized with respect to stage maximum of {maxStatusCount}.</span>
          </div>
        </div>

        {/* Chart 2: Product interest metrics */}
        <div className="bg-white border-2 border-slate-900 rounded-none p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display">Lead Interest by Product</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 mb-6">Which application gets the most engagement and project value.</p>
            
            <div className="space-y-4">
              {appInterest.map((item, idx) => {
                const percent = Math.round((item.count / maxAppCount) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 truncate max-w-[200px]">{item.name}</span>
                      <span className="font-mono text-slate-600 text-right">
                        <strong className="text-slate-900 font-black">{item.count}</strong> inquiries 
                        <span className="text-slate-300 mx-1">|</span> 
                        <strong className="text-indigo-600 font-black">${item.value.toLocaleString()}</strong>
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 border border-slate-900 rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 rounded-none transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[10px] text-slate-400 font-mono font-bold">
            <span>* Cumulative deal values mapped from verified public entries.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
