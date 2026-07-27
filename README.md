# Purple Clone AI Showcase & Lead Portal

Welcome to the **Purple Clone AI Showcase & Lead Portal**. This is a premium frontend and backend full-stack application built to display AI Agents and capture inbound leads while offering a secured admin portal interface to manage those assets.

## Features
- **Public Showcase**: Neobrutalist design layout with category filters and search to beautifully display operational pipelines and AI agents.
- **Inbound Lead Generation**: Built-in modal forms to capture user intent and push them to the persistent backend database.
- **Admin Portal**: Password-protected area (`admin`) to view pipeline analytics, manage inbound leads, and mutate the product catalog in real-time.
- **Persistent Data**: Lightweight JSON-based file storage (`/data/apps.json`, `/data/leads.json`).

## Run Locally

**Prerequisites:** Node.js v18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs Vite and the Express API concurrently):
   ```bash
   npm run dev
   ```

The app will be accessible locally, typically on `http://localhost:3000`.
