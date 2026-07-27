import React, { useState } from "react";
import { Plus, Check, Edit2, Trash2, ArrowRight, AppWindow, HelpCircle, X, CheckSquare, Sparkles } from "lucide-react";
import { AppItem, AppStatus } from "../types";
import { AppIcon } from "./AppCard";

interface AppCatalogProps {
  apps: AppItem[];
  onAddApp: (app: Omit<AppItem, "id">) => Promise<void>;
  onUpdateApp: (id: string, updates: Partial<AppItem>) => Promise<void>;
  onDeleteApp: (id: string) => Promise<void>;
}

export const AppCatalog: React.FC<AppCatalogProps> = ({ apps, onAddApp, onUpdateApp, onDeleteApp }) => {
  // Toggle adding mode
  const [isAdding, setIsAdding] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Utility");
  const [status, setStatus] = useState<AppStatus>("Active");
  const [logo, setLogo] = useState("AppWindow");
  const [url, setUrl] = useState("");
  const [priceModel, setPriceModel] = useState("Free");
  const [price, setPrice] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preset Logos with lucide terms for easy dropdown
  const logoPresets = [
    "AppWindow", "Database", "Shield", "Terminal", "Code", "Gauge", "Lock", "Cpu", 
    "Bot", "Wrench", "Server", "Briefcase", "Network", "Globe", "Cloud", "Coins", "Workflow", "Zap"
  ];

  const handleOpenAdd = () => {
    setIsAdding(true);
    setEditingApp(null);
    setName("");
    setDescription("");
    setCategory("Utility");
    setStatus("Active");
    setLogo("AppWindow");
    setUrl("");
    setPriceModel("Free");
    setPrice("");
    setFeatures([]);
    setFeatureInput("");
  };

  const handleOpenEdit = (app: AppItem) => {
    setIsAdding(false);
    setEditingApp(app);
    setName(app.name);
    setDescription(app.description);
    setCategory(app.category);
    setStatus(app.status);
    setLogo(app.logo);
    setUrl(app.url || "");
    setPriceModel(app.priceModel);
    setPrice(app.price || "");
    setFeatures(app.features || []);
    setFeatureInput("");
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Name and Description are required.");
      return;
    }
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        description,
        category,
        status,
        logo,
        url: url || undefined,
        priceModel,
        price: price || undefined,
        features
      };

      if (editingApp) {
        await onUpdateApp(editingApp.id, payload);
        setEditingApp(null);
      } else {
        await onAddApp(payload);
        setIsAdding(false);
      }
    } catch (err) {
      alert("Failed to submit app data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from your portfolio showcase?`)) {
      await onDeleteApp(id);
      if (editingApp?.id === id) {
        setEditingApp(null);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Showcases Apps Portfolio Admin Table (Left 2 columns) */}
      <div className="lg:col-span-2 bg-white border-2 border-slate-900 rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
        <div>
          {/* Table Header Section */}
          <div className="p-5 border-b-2 border-slate-900 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg font-display uppercase tracking-tight">Active App Portfolio</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Control live listings, details, URLs and metrics displayed to the public.</p>
            </div>
            
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add New App
            </button>
          </div>

          {/* Apps Row List */}
          <div className="divide-y-2 divide-slate-900">
            {apps.map((app) => (
              <div 
                key={app.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all ${
                  editingApp?.id === app.id ? "bg-amber-50" : ""
                }`}
              >
                {/* Info */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-slate-100 border-2 border-slate-900 rounded-none text-slate-900">
                    <AppIcon name={app.logo} className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base font-display">{app.name}</h4>
                    <div className="flex flex-wrap gap-2 items-center mt-1.5">
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-violet-100 border border-slate-950">
                        {app.category}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 border border-slate-950">
                        {app.priceModel}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        ID: {app.id.substring(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-dashed border-slate-200 sm:border-0">
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-slate-900 bg-emerald-400">
                      {app.status}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(app)}
                      className="p-1.5 bg-white hover:bg-indigo-50 border-2 border-slate-900 rounded-none text-slate-900 transition-colors shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id, app.name)}
                      className="p-1.5 bg-white hover:bg-red-50 border-2 border-slate-900 rounded-none text-red-600 transition-colors shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t-2 border-slate-900 text-xs text-slate-400 font-mono font-bold">
          Total dynamic application listings in database: {apps.length}
        </div>
      </div>

      {/* 2. Interactive Form Panel Editor (Right Column) */}
      <div className="bg-white border-2 border-slate-900 p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        {isAdding || editingApp ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">
                {editingApp ? "Edit Listing" : "Deploy New App"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingApp(null);
                }}
                className="text-slate-900 hover:bg-slate-100 p-1 border-2 border-slate-900"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Application Name */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                Application Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Server Monitor Widget"
                className="w-full px-3 py-1.5 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
              />
            </div>

            {/* Category / Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold"
                >
                  <option value="Security">Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Utility">Utility</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AppStatus)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold"
                >
                  <option value="Active">Active</option>
                  <option value="Beta">Beta</option>
                  <option value="Development">Development</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Pricing Config */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                  Pricing Model
                </label>
                <select
                  value={priceModel}
                  onChange={(e) => setPriceModel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold"
                >
                  <option value="Free">Free</option>
                  <option value="Paid Once">Paid Once</option>
                  <option value="SaaS License">SaaS License</option>
                  <option value="Custom Project">Custom Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                  Pricing Indicator
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. $49/mo, One-Time"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
                />
              </div>
            </div>

            {/* Icon Picker preset */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                Select Platform Icon
              </label>
              <div className="grid grid-cols-6 gap-1 bg-slate-50 p-2.5 border-2 border-slate-900 max-h-[100px] overflow-y-auto">
                {logoPresets.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLogo(l)}
                    className={`p-1.5 border flex items-center justify-center transition-colors ${
                      logo === l ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:bg-slate-100 border-slate-300"
                    }`}
                  >
                    <AppIcon name={l} className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* URL link */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                Production / Live URL Link
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://test-widget.cloudrun.app"
                className="w-full px-3 py-1.5 text-sm bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-mono font-medium"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 font-mono">
                Core App Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a clear summary of what this micro-service achieves."
                className="w-full p-2.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all resize-none font-medium leading-relaxed"
              ></textarea>
            </div>

            {/* Features Tags Builder */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
                Product Key Highlights
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="e.g. End-to-end TLS 1.3"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border-2 border-slate-900 rounded-none focus:outline-none focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 bg-slate-900 text-white font-bold text-xs"
                >
                  Add
                </button>
              </div>

              {/* Added items list */}
              <div className="flex flex-wrap gap-1.5 mt-2 max-h-[80px] overflow-y-auto">
                {features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-slate-100 border border-slate-900 font-bold px-1.5 py-0.5">
                    {feat}
                    <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Save app */}
            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingApp(null);
                }}
                className="px-3 py-1.5 border border-slate-900 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-wider border-2 border-slate-900 rounded-none transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center">
            <Sparkles className="w-8 h-8 text-slate-300 stroke-[2] mb-3" />
            <h4 className="text-sm font-black font-display uppercase text-slate-800 tracking-tight">Deploy Sandbox Listings</h4>
            <p className="text-xs text-slate-500 font-medium max-w-[200px] mt-1.5 mx-auto leading-relaxed">
              Create a new entry listing or select any of your registered application platforms to modify, launch or delete details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
