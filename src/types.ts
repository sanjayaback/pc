export type AppStatus = "Active" | "Beta" | "Development" | "Archived";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";

export interface AppItem {
  id: string;
  name: string;
  description: string;
  category: string;
  priceModel: string; // e.g. "Free", "Freemium", "Paid", "Subscription"
  price?: string;
  status: AppStatus;
  url?: string;
  logo: string; // lucide icon name (e.g. "MessageSquare", "Zap", "Shield", "Calendar")
  features: string[];
  createdAt: string;
}

export interface Lead {
  id: string;
  appId: string; // "general" or specific App ID
  appName: string; // "General Inquiry" or specific App Name
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  message: string;
  status: LeadStatus;
  value: number; // Estimated deal/project value in USD
  notes: string; // Private developer CRM notes
  createdAt: string;
  updatedAt: string;
}
