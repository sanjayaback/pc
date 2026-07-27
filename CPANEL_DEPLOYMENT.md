# cPanel deployment guide

## 1. Upload these files/folders to your cPanel app root
Use the project root as the cPanel app root. Do not point cPanel at the source folders such as [src](src) or the TypeScript entry [server.ts](server.ts).

Required runtime files and folders:
- package.json
- app.js
- dist-server.cjs
- dist/
- data/
- public/ (optional)
- node_modules/ (after running npm install)

The app root must be the folder that contains [package.json](package.json) and [app.js](app.js).

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
