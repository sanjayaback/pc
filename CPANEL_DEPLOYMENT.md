# cPanel deployment guide

## 1. Upload these files/folders to your cPanel app root
Upload the entire project folder contents to the app root you select in cPanel.

Required files:
- package.json
- app.js
- dist-server.cjs
- server.ts
- data/
- src/
- node_modules/ (after running npm install)
- public/ (optional)

## 2. In cPanel, create a Node.js app
Use these values:
- Application root: /home/purplecl/pc
- Startup file: app.js
- Node version: 18

## 3. Run these commands in the app root
If SSH access is available:

```bash
npm install
npm run build
```

## 4. Start the app
Use one of these:
- Startup file: app.js
- Or startup command: node dist-server.cjs

## 5. Important notes
- The app uses JSON file storage, so no database is required.
- The app must be able to write to the data folder.
- The server uses the cPanel-provided PORT environment variable when available.
