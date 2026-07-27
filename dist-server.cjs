var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_vite = require("vite");
var DEFAULT_APPS = [
  {
    id: "cloneagent-support",
    name: "CloneAgent Support",
    description: "An autonomous customer service agent running on Purple Clone's specialized agentic architecture. Resolves client support tickets, schedules live demos, and synchronizes CRM databases in real-time.",
    category: "AI Agents",
    priceModel: "SaaS License",
    price: "$149/mo starter",
    status: "Active",
    url: "https://cloneagent.purpleclone.com",
    logo: "Bot",
    features: ["Autonomous multi-channel support", "Instant CRM database synchronization", "Semantic intent recognition", "Graceful handoff to human operators"],
    createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "workflow-optimizer",
    name: "WorkflowOptimizer Pro",
    description: "Transform manual routines into bulletproof autonomous integration pipelines. Instantly connects databases, webhooks, email servers, and enterprise APIs using plain natural language flow commands.",
    category: "Workflow Automation",
    priceModel: "SaaS License",
    price: "$89/mo startup",
    status: "Active",
    url: "https://optimizer.purpleclone.com",
    logo: "Zap",
    features: ["Natural language pipeline compiler", "Self-healing error state recovery", "Pre-built webhook connectors", "Detailed visual execution logs"],
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "datasift-extractor",
    name: "DataSift AI Extractor",
    description: "Extract structured metrics, deep insights, structured tables, and custom JSON schemas from chaotic multi-page PDFs, paper scans, and corporate emails automatically with 99.4% accuracy.",
    category: "AI Automation",
    priceModel: "Usage-Based",
    price: "$0.02 per page",
    status: "Beta",
    url: "https://datasift.purpleclone.com",
    logo: "Database",
    features: ["Structured JSON schema exports", "Handwritten text OCR recognition", "Batch folder monitoring", "Enterprise-grade compliance security"],
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "autonomous-leadscout",
    name: "Autonomous LeadScout",
    description: "Agentic prospecting web crawler scanning corporate filings, news feeds, and professional networks to identify real-time buying intent signals and draft tailored outreach strategies.",
    category: "AI Agents",
    priceModel: "Subscription",
    price: "$199/mo per seat",
    status: "Development",
    url: "",
    logo: "Search",
    features: ["Intent signal scraping engine", "Hyper-personalized email draft builder", "Automated multi-stage followups", "Verified contact address checks"],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var DEFAULT_LEADS = [
  {
    id: "lead-1",
    appId: "cloneagent-support",
    appName: "CloneAgent Support",
    clientName: "Sarah Jenkins",
    clientEmail: "sarah.j@quantumtech.com",
    clientCompany: "QuantumTech",
    message: "We are evaluating CloneAgent Support to handle our first-tier customer inquiries. We have about 12,000 requests monthly. Does Purple Clone support customized knowledge-base training and custom database integrations?",
    status: "Qualified",
    value: 4500,
    notes: "Wants customized knowledge training and custom fine-tuning. Setup intro call for next Monday.",
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1e3).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "lead-2",
    appId: "workflow-optimizer",
    appName: "WorkflowOptimizer Pro",
    clientName: "Marcus Vance",
    clientEmail: "m.vance@logistics-plus.com",
    clientCompany: "Logistics Plus",
    message: "Looking to automate our daily order dispatching workflows. We want to parse incoming freight emails, extract tracking IDs, and push them to our shipping software. Can WorkflowOptimizer Pro achieve this with high reliability?",
    status: "Contacted",
    value: 2800,
    notes: "Freight email parsing and automated dispatch. Shared optimization diagram. Waiting on technical walkthrough callback.",
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1e3).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "lead-3",
    appId: "general",
    appName: "General Inquiry",
    clientName: "Helena Rostova",
    clientEmail: "helena@finovate.io",
    clientCompany: "Finovate Labs",
    message: "We are looking to build a highly tailored agentic AI model to automate our internal risk analysis and compliance check operations. Could the Purple Clone team build a custom enterprise agent on a freelance/consulting basis?",
    status: "Proposal",
    value: 15e3,
    notes: "High priority custom agentic compliance project. Sent formal proposal document for $15,000. Under review by leadership.",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var APPS_FILE = import_path.default.join(DATA_DIR, "apps.json");
var LEADS_FILE = import_path.default.join(DATA_DIR, "leads.json");
function initStorage() {
  if (!import_fs.default.existsSync(DATA_DIR)) {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!import_fs.default.existsSync(APPS_FILE)) {
    import_fs.default.writeFileSync(APPS_FILE, JSON.stringify(DEFAULT_APPS, null, 2));
  }
  if (!import_fs.default.existsSync(LEADS_FILE)) {
    import_fs.default.writeFileSync(LEADS_FILE, JSON.stringify(DEFAULT_LEADS, null, 2));
  }
}
initStorage();
function readApps() {
  try {
    const raw = import_fs.default.readFileSync(APPS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_APPS;
  }
}
function writeApps(data) {
  import_fs.default.writeFileSync(APPS_FILE, JSON.stringify(data, null, 2));
}
function readLeads() {
  try {
    const raw = import_fs.default.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_LEADS;
  }
}
function writeLeads(data) {
  import_fs.default.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2));
}
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  app.get("/api/apps", (req, res) => {
    res.json(readApps());
  });
  app.post("/api/apps", (req, res) => {
    const apps = readApps();
    const newApp = {
      id: req.body.id || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: req.body.name,
      description: req.body.description || "",
      category: req.body.category || "General",
      priceModel: req.body.priceModel || "Free",
      price: req.body.price || "",
      status: req.body.status || "Development",
      url: req.body.url || "",
      logo: req.body.logo || "Globe",
      features: req.body.features || [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    let count = 1;
    let baseId = newApp.id;
    while (apps.some((a) => a.id === newApp.id)) {
      newApp.id = `${baseId}-${count}`;
      count++;
    }
    apps.push(newApp);
    writeApps(apps);
    res.status(201).json(newApp);
  });
  app.put("/api/apps/:id", (req, res) => {
    const { id } = req.params;
    const apps = readApps();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "App not found" });
    }
    apps[index] = {
      ...apps[index],
      name: req.body.name !== void 0 ? req.body.name : apps[index].name,
      description: req.body.description !== void 0 ? req.body.description : apps[index].description,
      category: req.body.category !== void 0 ? req.body.category : apps[index].category,
      priceModel: req.body.priceModel !== void 0 ? req.body.priceModel : apps[index].priceModel,
      price: req.body.price !== void 0 ? req.body.price : apps[index].price,
      status: req.body.status !== void 0 ? req.body.status : apps[index].status,
      url: req.body.url !== void 0 ? req.body.url : apps[index].url,
      logo: req.body.logo !== void 0 ? req.body.logo : apps[index].logo,
      features: req.body.features !== void 0 ? req.body.features : apps[index].features
    };
    writeApps(apps);
    res.json(apps[index]);
  });
  app.delete("/api/apps/:id", (req, res) => {
    const { id } = req.params;
    let apps = readApps();
    const initialLen = apps.length;
    apps = apps.filter((a) => a.id !== id);
    if (apps.length === initialLen) {
      return res.status(404).json({ error: "App not found" });
    }
    writeApps(apps);
    res.json({ success: true });
  });
  app.get("/api/leads", (req, res) => {
    res.json(readLeads());
  });
  app.post("/api/leads", (req, res) => {
    const leads = readLeads();
    const newLead = {
      id: "lead-" + Math.random().toString(36).substr(2, 9),
      appId: req.body.appId || "general",
      appName: req.body.appName || "General Inquiry",
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientCompany: req.body.clientCompany || "",
      message: req.body.message,
      status: "New",
      value: Number(req.body.value) || 0,
      notes: req.body.notes || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    leads.push(newLead);
    writeLeads(leads);
    res.status(201).json(newLead);
  });
  app.put("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    const leads = readLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Lead not found" });
    }
    leads[index] = {
      ...leads[index],
      status: req.body.status !== void 0 ? req.body.status : leads[index].status,
      value: req.body.value !== void 0 ? Number(req.body.value) : leads[index].value,
      notes: req.body.notes !== void 0 ? req.body.notes : leads[index].notes,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    writeLeads(leads);
    res.json(leads[index]);
  });
  app.delete("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    let leads = readLeads();
    const initialLen = leads.length;
    leads = leads.filter((l) => l.id !== id);
    if (leads.length === initialLen) {
      return res.status(404).json({ error: "Lead not found" });
    }
    writeLeads(leads);
    res.json({ success: true });
  });
  const PORT = process.env.PORT || 3e3;
  const isDevMode = process.argv.includes("--dev") || process.env.NODE_ENV === "development";
  if (isDevMode) {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=dist-server.cjs.map
