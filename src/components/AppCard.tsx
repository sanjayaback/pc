import React from "react";
import * as LucideIcons from "lucide-react";
import { AppItem } from "../types";

// Helper component to render Lucide icon by name dynamically
export const AppIcon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  // Safe lookup for dynamic icon rendering
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Globe;
  return <IconComponent className={className} />;
};

interface AppCardProps {
  app: AppItem;
  onInquire: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onInquire }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-400 text-slate-900 border-slate-900";
      case "Beta":
        return "bg-yellow-300 text-slate-900 border-slate-900";
      case "Development":
        return "bg-sky-300 text-slate-900 border-slate-900";
      case "Archived":
        return "bg-slate-300 text-slate-700 border-slate-900";
      default:
        return "bg-slate-100 text-slate-900 border-slate-900";
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("dev") || cat.includes("ops")) return "bg-violet-200";
    if (cat.includes("sec")) return "bg-rose-200";
    if (cat.includes("prod") || cat.includes("work")) return "bg-amber-200";
    return "bg-teal-200";
  };

  return (
    <div 
      id={`app-card-${app.id}`} 
      className="bg-white border-2 border-slate-900 rounded-none p-6 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between h-full group"
    >
      <div>
        {/* Top bar with logo and status */}
        <div className="flex items-start justify-between mb-5">
          <div className="p-3 bg-slate-100 border-2 border-slate-900 rounded-none text-slate-900 group-hover:bg-yellow-200 transition-colors duration-200">
            <AppIcon name={app.logo} className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-none border-2 ${getStatusStyle(app.status)}`}>
            {app.status}
          </span>
        </div>

        {/* Category & Title */}
        <div className="mb-1">
          <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 border-2 border-slate-900 rounded-none ${getCategoryColor(app.category)}`}>
            {app.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 mt-3 font-display tracking-tight">
          {app.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-700 mt-3 leading-relaxed font-medium min-h-[3.75rem]">
          {app.description}
        </p>

        {/* Features list */}
        {app.features && app.features.length > 0 && (
          <div className="mt-5 pt-4 border-t-2 border-slate-900">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">Key Highlights</h4>
            <ul className="space-y-1.5">
              {app.features.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="flex items-center text-xs text-slate-800 font-medium">
                  <div className="w-4 h-4 bg-emerald-400 border border-slate-900 flex items-center justify-center mr-2.5 shrink-0">
                    <LucideIcons.Check className="w-3 h-3 text-slate-900 stroke-[3]" />
                  </div>
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer bar with price & action buttons */}
      <div className="mt-6 pt-4 border-t-2 border-slate-900 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Pricing Model</span>
          <span className="text-xs font-black text-slate-900 block mt-0.5">
            {app.priceModel} {app.price && <span className="text-slate-500 font-bold font-mono">({app.price})</span>}
          </span>
        </div>
        
        <div className="flex gap-2">
          {app.url && (
            <a
              id={`app-btn-live-${app.id}`}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 border-2 border-slate-900 rounded-none text-slate-900 hover:bg-slate-200 transition-colors shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              title="Launch Live App"
            >
              <LucideIcons.ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            id={`app-btn-inquire-${app.id}`}
            onClick={() => onInquire(app)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 rounded-none transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};
