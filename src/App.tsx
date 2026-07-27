import React, { useState, useEffect } from "react";
import { 
  LogOut, Search, Sparkles, HelpCircle, MessageSquare
} from "lucide-react";
import { AppItem, Lead } from "./types";
import { AppCard } from "./components/AppCard";
import { LeadForm } from "./components/LeadForm";
import { CrmAnalytics } from "./components/CrmAnalytics";
import { LeadManager } from "./components/LeadManager";
import { AppCatalog } from "./components/AppCatalog";
import { AboutUs } from "./components/AboutUs";
import { ContactUs } from "./components/ContactUs";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginGate } from "./components/LoginGate";

export default function App() {
  // Navigation & Mode State
  const [activeTab, setActiveTab] = useState<"showcase" | "crm">("showcase");
  const [showcaseTab, setShowcaseTab] = useState<"catalog" | "about" | "contact">("catalog");
  const [crmView, setCrmView] = useState<"analytics" | "leads" | "catalog">("analytics");

  // Database State
  const [apps, setApps] = useState<AppItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inquiry form overlay state
  const [selectedInquiryApp, setSelectedInquiryApp] = useState<AppItem | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Showcase Search / Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // CRM Password Gate State
  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState(false);

  // Load state from sessionStorage if they already logged in during this browser session
  useEffect(() => {
    const auth = sessionStorage.getItem("crm_auth");
    if (auth === "true") {
      setIsCrmAuthenticated(true);
    }
  }, []);

  // Fetch apps & leads on boot
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const appsRes = await fetch("/api/apps");
        const appsData = await appsRes.json();
        setApps(appsData);

        const leadsRes = await fetch("/api/leads");
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      } catch (err) {
        console.error("Error loading server-side JSON database:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Public Lead submit callback
  const handleLeadSubmitted = (newLead: Lead) => {
    setLeads((prev) => [...prev, newLead]);
  };

  const refreshLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error refreshing leads:", err);
    }
  };

  // CRM - Lead Update handler
  const handleUpdateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      const updatedLead = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updatedLead : l)));
    } catch (err) {
      console.error(err);
      alert("Error updating lead status in CRM database");
    }
  };

  // CRM - Lead Delete handler
  const handleDeleteLead = async (leadId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    } catch (err) {
      console.error(err);
      alert("Error deleting lead from CRM database");
    }
  };

  // CRM - App Create handler
  const handleCreateApp = async (appData: Omit<AppItem, "id">) => {
    try {
      const res = await fetch("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
      });
      if (!res.ok) throw new Error("Failed to create app");
      const newApp = await res.json();
      setApps((prev) => [...prev, newApp]);
    } catch (err) {
      console.error(err);
      alert("Error registering new product in database");
    }
  };

  // CRM - App Update handler
  const handleUpdateApp = async (id: string, updates: Partial<AppItem>) => {
    try {
      const res = await fetch(`/api/apps/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update app");
      const updatedApp = await res.json();
      setApps((prev) => prev.map((a) => (a.id === id ? updatedApp : a)));
    } catch (err) {
      console.error(err);
      alert("Error updating app info in catalog database");
    }
  };

  // CRM - App Delete handler
  const handleDeleteApp = async (id: string) => {
    try {
      const res = await fetch(`/api/apps/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete app");
      setApps((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product from database");
    }
  };

  // Login Handle
  const handleLoginSuccess = () => {
    setIsCrmAuthenticated(true);
    sessionStorage.setItem("crm_auth", "true");
  };

  const handleLogout = () => {
    setIsCrmAuthenticated(false);
    sessionStorage.removeItem("crm_auth");
  };

  // Open Inquiry Modal
  const openInquireModal = (app: AppItem | null) => {
    setSelectedInquiryApp(app);
    setShowInquiryModal(true);
  };

  // Category list extraction
  const categories = ["All", ...Array.from(new Set(apps.map((a) => a.category)))];

  // Filtered Apps list
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-yellow-200">
      {/* Top Neobrutalist Premium Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isCrmAuthenticated={isCrmAuthenticated} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-slate-900 border-t-yellow-300 animate-spin rounded-none mb-4"></div>
            <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">Mounting persistent CRM tables...</p>
          </div>
        ) : activeTab === "showcase" ? (
          
          /* ==============================================
             CLIENT-FACING SHOWCASE VIEW
             ============================================== */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Secondary Showcase Navigation (Products, About Us, Contact Us) */}
            <div className="flex flex-col sm:flex-row border-4 border-slate-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  id="subtab-catalog"
                  onClick={() => setShowcaseTab("catalog")}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all w-full sm:w-auto ${
                    showcaseTab === "catalog"
                      ? "bg-indigo-500 border-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Products Catalog
                </button>
                <button
                  id="subtab-about"
                  onClick={() => setShowcaseTab("about")}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all w-full sm:w-auto ${
                    showcaseTab === "about"
                      ? "bg-indigo-500 border-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  About Us
                </button>
                <button
                  id="subtab-contact"
                  onClick={() => setShowcaseTab("contact")}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all w-full sm:w-auto ${
                    showcaseTab === "contact"
                      ? "bg-indigo-500 border-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Contact Us
                </button>
              </div>
              
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider hidden md:block">
                {showcaseTab === "catalog" && `System Index: ${filteredApps.length} Operational Pipelines`}
                {showcaseTab === "about" && "Purple Clone Agentic Manifesto"}
                {showcaseTab === "contact" && "Engage Automation Architects"}
              </div>
            </div>

            {showcaseTab === "catalog" ? (
              <div className="space-y-8">
                {/* Elegant Bento Display Hero Banner */}
                <section className="bg-indigo-300 border-4 border-slate-900 p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-yellow-300 border-2 border-slate-900 text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    AI SYSTEMS ACTIVE
                  </div>
                  
                  <div className="max-w-2xl">
                    <span className="text-xs font-mono font-black text-slate-900 bg-white border-2 border-slate-900 px-3 py-1 uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <Sparkles className="w-4 h-4 fill-yellow-300 stroke-[2]" /> PURPLE CLONE AUTOMATION
                    </span>
                    
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display mt-6 leading-[1.15] uppercase">
                      Agentic AI Apps & Intelligent Workflows
                    </h2>
                    
                    <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
                      Deploy autonomous AI agents, fine-tune smart document extractors, and build resilient, self-healing workflow pipelines designed by <a href="https://www.purpleclone.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-slate-950 hover:text-indigo-950">Purple Clone</a>. Eliminate repetitive tasks and scale operations at machine speed.
                    </p>
                    
                    <div className="mt-8 flex flex-wrap gap-4">
                      <button
                        id="btn-general-consult"
                        onClick={() => setShowcaseTab("contact")}
                        className="px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Connect Your Tech Stack
                      </button>
                      <a
                        href="https://www.purpleclone.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
                      >
                        Visit purpleclone.com
                      </a>
                    </div>
                  </div>
                </section>

                {/* Filter and Search Utility Row */}
                <section className="bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                          selectedCategory === cat
                            ? "bg-slate-900 border-slate-900 text-white shadow-none"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-150"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Live Search bar */}
                  <div className="relative max-w-sm w-full">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-900 font-black">
                      <Search className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, highlights..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border-2 border-slate-900 focus:bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all font-medium"
                    />
                  </div>
                </section>

                {/* Apps Listing Grid */}
                {filteredApps.length === 0 ? (
                  <div className="bg-white border-2 border-slate-900 p-16 text-center max-w-md mx-auto shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <HelpCircle className="w-10 h-10 text-slate-400 mx-auto stroke-[2] mb-3" />
                    <h4 className="font-black text-slate-900 text-base font-display uppercase tracking-tight">No products match search</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Try resetting your category filters or refine your keyword search query.</p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                      className="mt-5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border-2 border-slate-900 transition-colors shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.map((app) => (
                      <AppCard 
                        key={app.id} 
                        app={app} 
                        onInquire={openInquireModal} 
                      />
                    ))}
                  </section>
                )}
              </div>
            ) : showcaseTab === "about" ? (
              <AboutUs />
            ) : (
              <ContactUs onSubmissionSuccess={refreshLeads} />
            )}
          </div>
        ) : (
          
          /* ==============================================
             LOGIN VIEW
             ============================================== */
          <div className="space-y-6">
            {!isCrmAuthenticated ? (
              
              <LoginGate onSuccess={handleLoginSuccess} />
            ) : (
              
              /* CRM Panel Interface */
              <div className="space-y-6">
                
                {/* Panel Top Navigation bar */}
                <div className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Dashboard Subviews */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="crm-btn-analytics"
                      onClick={() => setCrmView("analytics")}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                        crmView === "analytics"
                          ? "bg-slate-900 text-white shadow-none"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Metrics & Funnels
                    </button>
                    <button
                      id="crm-btn-leads"
                      onClick={() => setCrmView("leads")}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 transition-all ${
                        crmView === "leads"
                          ? "bg-slate-900 text-white shadow-none"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Inbound Leads 
                      <span className="px-1.5 py-0.5 bg-yellow-300 text-slate-900 text-[10px] font-black border border-slate-900">
                        {leads.filter(l => l.status === "New").length}
                      </span>
                    </button>
                    <button
                      id="crm-btn-catalog"
                      onClick={() => setCrmView("catalog")}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                        crmView === "catalog"
                          ? "bg-slate-900 text-white shadow-none"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Product Catalog
                    </button>
                  </div>

                  {/* Auth Meta / Logout */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                    <span className="text-xs text-slate-500 font-mono font-bold">
                      Agent: <strong className="text-slate-900 font-black">Developer Root</strong>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-900 border-2 border-red-900 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Lock CRM
                    </button>
                  </div>
                </div>

                {/* Subview Component Injection */}
                <div>
                  {crmView === "analytics" && (
                    <CrmAnalytics 
                      leads={leads} 
                      apps={apps} 
                    />
                  )}
                  {crmView === "leads" && (
                    <LeadManager 
                      leads={leads} 
                      onUpdateLead={handleUpdateLead} 
                      onDeleteLead={handleDeleteLead} 
                    />
                  )}
                  {crmView === "catalog" && (
                    <AppCatalog 
                      apps={apps} 
                      onAddApp={handleCreateApp} 
                      onUpdateApp={handleUpdateApp} 
                      onDeleteApp={handleDeleteApp} 
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer information bar */}
      <Footer />

      {/* Inquiry Modal Overlay */}
      {showInquiryModal && (
        <LeadForm 
          app={selectedInquiryApp} 
          onClose={() => setShowInquiryModal(false)} 
          onSubmitSuccess={handleLeadSubmitted} 
        />
      )}
    </div>
  );
}
