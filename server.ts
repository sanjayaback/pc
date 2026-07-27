import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { AppItem, Lead } from "./src/types";

// Seed Data
const DEFAULT_APPS: AppItem[] = [
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
    createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()
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
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString()
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
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
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
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_LEADS: Lead[] = [
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
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
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
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
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
    value: 15000,
    notes: "High priority custom agentic compliance project. Sent formal proposal document for $15,000. Under review by leadership.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Ensure database directory exists
const DATA_DIR = path.join(process.cwd(), "data");
const APPS_FILE = path.join(DATA_DIR, "apps.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPS_FILE)) {
    fs.writeFileSync(APPS_FILE, JSON.stringify(DEFAULT_APPS, null, 2));
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(DEFAULT_LEADS, null, 2));
  }
}

initStorage();

function readApps(): AppItem[] {
  try {
    const raw = fs.readFileSync(APPS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_APPS;
  }
}

function writeApps(data: AppItem[]) {
  fs.writeFileSync(APPS_FILE, JSON.stringify(data, null, 2));
}

function readLeads(): Lead[] {
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_LEADS;
  }
}

function writeLeads(data: Lead[]) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Endpoints: Apps
  app.get("/api/apps", (req, res) => {
    res.json(readApps());
  });

  app.post("/api/apps", (req, res) => {
    const apps = readApps();
    const newApp: AppItem = {
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
      createdAt: new Date().toISOString()
    };
    
    // Ensure uniqueness of ID
    let count = 1;
    let baseId = newApp.id;
    while (apps.some(a => a.id === newApp.id)) {
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
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "App not found" });
    }

    apps[index] = {
      ...apps[index],
      name: req.body.name !== undefined ? req.body.name : apps[index].name,
      description: req.body.description !== undefined ? req.body.description : apps[index].description,
      category: req.body.category !== undefined ? req.body.category : apps[index].category,
      priceModel: req.body.priceModel !== undefined ? req.body.priceModel : apps[index].priceModel,
      price: req.body.price !== undefined ? req.body.price : apps[index].price,
      status: req.body.status !== undefined ? req.body.status : apps[index].status,
      url: req.body.url !== undefined ? req.body.url : apps[index].url,
      logo: req.body.logo !== undefined ? req.body.logo : apps[index].logo,
      features: req.body.features !== undefined ? req.body.features : apps[index].features,
    };

    writeApps(apps);
    res.json(apps[index]);
  });

  app.delete("/api/apps/:id", (req, res) => {
    const { id } = req.params;
    let apps = readApps();
    const initialLen = apps.length;
    apps = apps.filter(a => a.id !== id);
    if (apps.length === initialLen) {
      return res.status(404).json({ error: "App not found" });
    }
    writeApps(apps);
    res.json({ success: true });
  });

  // API Endpoints: Leads
  app.get("/api/leads", (req, res) => {
    res.json(readLeads());
  });

  app.post("/api/leads", (req, res) => {
    const leads = readLeads();
    const newLead: Lead = {
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    leads.push(newLead);
    writeLeads(leads);
    res.status(201).json(newLead);
  });

  app.put("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    const leads = readLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Lead not found" });
    }

    leads[index] = {
      ...leads[index],
      status: req.body.status !== undefined ? req.body.status : leads[index].status,
      value: req.body.value !== undefined ? Number(req.body.value) : leads[index].value,
      notes: req.body.notes !== undefined ? req.body.notes : leads[index].notes,
      updatedAt: new Date().toISOString()
    };

    writeLeads(leads);
    res.json(leads[index]);
  });

  app.delete("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    let leads = readLeads();
    const initialLen = leads.length;
    leads = leads.filter(l => l.id !== id);
    if (leads.length === initialLen) {
      return res.status(404).json({ error: "Lead not found" });
    }
    writeLeads(leads);
    res.json({ success: true });
  });

  const PORT = process.env.PORT || 3000;
  const isDevMode = process.argv.includes("--dev") || process.env.NODE_ENV === "development";

  // Serve Vite in development, static files in production
  if (isDevMode) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const publicPath = path.join(process.cwd(), "public");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else if (fs.existsSync(publicPath)) {
      app.use(express.static(publicPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
      });
    } else {
      app.get("*", (req, res) => {
        res.type("html").send(`<!doctype html><html><head><meta charset="utf-8" /><title>Purple Clone</title></head><body><h1>Purple Clone app is running</h1><p>The production bundle is not present yet. Please run npm run build.</p></body></html>`);
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
