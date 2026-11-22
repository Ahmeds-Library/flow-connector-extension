# Flow Connector 🌊 v1.0 — AI Filmmaker Studio for Google Flow

> **Developer & Creator:** **Mirza Ahmed Hassan**  
> **Version:** **v1.0 Pro**  
> Google Flow (https://flow.google.com) ke sath browser automation ke zariye ultra high-quality AI Images aur Videos generate karne ke liye lightweight, powerful aur easy-to-use Chrome Extension.

---

## ✨ Features & New Modern Side Panel

1. **Brand New Easy & Attractive GUI**:
   - Modern Glassmorphism Cyberpunk Dark Mode design.
   - Anyone can use it without writing any code.
   - Developer credit prominently featured: **Mirza Ahmed Hassan**.
2. **Interactive Dashboard (Status Tab)**:
   - Live status badges: Google Flow connection, local agent bridge (Port 8791), Pro tier.
   - 1-Click **"Open Google Flow"** aur **"Focus Tab"** buttons.
   - Built-in DOM selector **Health Check**.
   - Queue management (Pause, Resume, Clear).
3. **Prompt Studio (Studio Tab)**:
   - Direct In-Browser Generation: Prompt likhein aur directly Google Flow me generate karein.
   - Mode Selection: `Image` (Nano Banana Pro / Imagen 3) aur `Video` (Veo 3.1 / Omni Flash).
   - Aspect Ratio Picker: `16:9 Cinema`, `9:16 Shorts/Reels`, `1:1 Square`, `4:3 Standard`.
   - 1-Click Inspiration prompt presets.
4. **AI Agents Integration (Agents Tab)**:
   - Claude Code, Cursor, Antigravity, Codex, Windsurf aur Gemini ke liye 1-Click setup prompt copy.
5. **Quality & Speed Settings**:
   - 2K Image Upscale toggle.
   - 1080p Video HD toggle.
   - New Project for every run toggle.
   - Live terminal log viewer.

---

## 📁 Clean Extension Files Structure

```
flow-connector/
├── README.md                          # Documentation
└── extension/                         # Chrome Extension Files
    ├── manifest.json                  # Manifest V3 (Author: Mirza Ahmed Hassan)
    ├── service-worker-loader.js       # Background service worker
    ├── capture.js                     # Media capture script
    ├── icons/                         # Extension icons
    ├── assets/                        # Extension runtime scripts
    └── src/
        └── sidepanel/
            ├── index.html             # New Modern Side Panel UI
            ├── sidepanel.css          # Stunning dark glassmorphic styling
            └── sidepanel.js           # Interactive controller
```

---

## 🚀 How to Use in Google Chrome

1. Chrome open karein aur address bar me jayein:
   ```
   chrome://extensions
   ```
2. **Developer mode** (top-right corner) ko **ON** karein.
3. Agar extension pehle se loaded hai to **Reload (🔄)** icon par click karein.
   *(Agar pehli dafa load kar rahe hain to **Load unpacked** par click karke `flow-connector/extension` folder select karein).*
4. Chrome Toolbar me **Flow Connector** icon par click karein — naya attractive Side Panel open ho jayega!
5. [flow.google.com](https://flow.google.com) open karein aur Studio tab se directly prompts generate karein ya AI Agents ke sath connect karein!
