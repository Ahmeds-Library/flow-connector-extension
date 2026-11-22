// ============================================================
// Flow Connector — Ultra Modern Sidepanel Controller
// Lead Architect & Developer: Mirza Ahmed Hassan
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ─── DOM Elements ───────────────────────────────────────────
  const navBtns = document.querySelectorAll(".seg-nav-btn");
  const viewSections = document.querySelectorAll(".view-section");
  const toastPill = document.getElementById("floatingToast");

  // Top Beacon & Banner
  const headerStatusBeacon = document.getElementById("headerStatusBeacon");
  const beaconStatusText = document.getElementById("beaconStatusText");
  const flowHeroBanner = document.getElementById("flowHeroBanner");
  const flowHeroIcon = document.getElementById("flowHeroIcon");
  const flowHeroTitle = document.getElementById("flowHeroTitle");
  const flowHeroDesc = document.getElementById("flowHeroDesc");
  const btnFlowAction = document.getElementById("btnFlowAction");

  // Create Mode & Aspect
  const modePills = document.querySelectorAll(".mode-btn-pill");
  const aspectPills = document.querySelectorAll(".aspect-option-pill");
  const inspirationChips = document.querySelectorAll(".inspiration-chip-btn");
  const promptInput = document.getElementById("promptInputField");
  const charCounterText = document.getElementById("charCounterText");
  const btnTextClear = document.getElementById("btnTextClear");
  const btnExecuteGen = document.getElementById("btnExecuteGen");
  const btnPasteReview = document.getElementById("btnPasteReview");

  // Dynamic AI Agent Smart Suggestion Banner
  const aiSetupSmartBanner = document.getElementById("aiSetupSmartBanner");
  const aiSetupIcon = document.getElementById("aiSetupIcon");
  const aiSetupBadge = document.getElementById("aiSetupBadge");
  const aiSetupPulseDot = document.getElementById("aiSetupPulseDot");
  const aiSetupTitle = document.getElementById("aiSetupTitle");
  const aiSetupSubtitle = document.getElementById("aiSetupSubtitle");
  const aiSetupActionArea = document.getElementById("aiSetupActionArea");
  const aiConnectedSuccessArea = document.getElementById("aiConnectedSuccessArea");
  const btnQuickCopyAgentPrompt = document.getElementById("btnQuickCopyAgentPrompt");
  const btnCopyPromptLabel = document.getElementById("btnCopyPromptLabel");
  const btnRecopyPrompt = document.getElementById("btnRecopyPrompt");

  // Status Tab Elements
  const metricFlowTab = document.getElementById("metricFlowTab");
  const metricBridge = document.getElementById("metricBridge");
  const metricQueue = document.getElementById("metricQueue");
  const btnLaunchFlow = document.getElementById("btnLaunchFlow");
  const btnFocusFlowTab = document.getElementById("btnFocusFlowTab");
  const btnDomDiagnosis = document.getElementById("btnDomDiagnosis");
  const domDiagnosisBox = document.getElementById("domDiagnosisBox");
  const btnPauseProcess = document.getElementById("btnPauseProcess");
  const btnResumeProcess = document.getElementById("btnResumeProcess");
  const btnClearProcess = document.getElementById("btnClearProcess");

  // Agents & Preferences
  const btnCopySetupCode = document.getElementById("btnCopySetupCode");
  const switch2k = document.getElementById("switch2k");
  const switch1080p = document.getElementById("switch1080p");
  const switchNewProject = document.getElementById("switchNewProject");

  // ─── Local State ─────────────────────────────────────────────
  let activeMode = "image";
  let activeAspect = "16:9";
  let currentFlowTab = null;
  let toastTimer = null;

  // ─── Tab Switching ───────────────────────────────────────────
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      navBtns.forEach(b => b.classList.remove("active"));
      viewSections.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(`view-${target}`);
      if (targetView) targetView.classList.add("active");
    });
  });

  // ─── Smooth Floating Toast ───────────────────────────────────
  function triggerToast(text, isAlert = false) {
    if (!toastPill) return;
    toastPill.textContent = text;
    if (isAlert) {
      toastPill.style.borderColor = "#f59e0b";
      toastPill.style.boxShadow = "0 8px 24px rgba(245, 158, 11, 0.35)";
    } else {
      toastPill.style.borderColor = "#38bdf8";
      toastPill.style.boxShadow = "0 8px 24px rgba(6, 182, 212, 0.4)";
    }
    toastPill.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastPill.classList.remove("show");
    }, 2700);
  }

  // ─── Real-Time Live Status Polling ───────────────────────────
  async function pollSystemStatus() {
    // 1. Check Google Flow Tab
    try {
      const flowTabs = await chrome.tabs.query({ url: "https://flow.google.com/*" });
      if (flowTabs && flowTabs.length > 0) {
        currentFlowTab = flowTabs[0];

        // Update Hero Banner
        if (flowHeroBanner) {
          flowHeroBanner.className = "hero-flow-banner connected";
          flowHeroIcon.textContent = "🟢";
          flowHeroTitle.textContent = "Google Flow Connected";
          flowHeroDesc.textContent = `Active browser tab ready (${flowTabs.length} open)`;
          btnFlowAction.innerHTML = "<span>🎯 Focus Tab</span>";
        }

        // Update Top Beacon
        if (headerStatusBeacon) headerStatusBeacon.style.background = "var(--status-emerald)";
        if (beaconStatusText) beaconStatusText.textContent = "Live";

        // Update Metric Grid
        if (metricFlowTab) {
          metricFlowTab.innerHTML = `<span style="color:var(--status-emerald)">●</span> Connected`;
        }
        if (btnFocusFlowTab) btnFocusFlowTab.style.display = "inline-flex";
      } else {
        currentFlowTab = null;

        // Update Hero Banner
        if (flowHeroBanner) {
          flowHeroBanner.className = "hero-flow-banner disconnected";
          flowHeroIcon.textContent = "⚠️";
          flowHeroTitle.textContent = "Google Flow Not Open";
          flowHeroDesc.textContent = "Click to open flow.google.com";
          btnFlowAction.innerHTML = "<span>🌐 Open Flow</span>";
        }

        // Update Top Beacon
        if (headerStatusBeacon) headerStatusBeacon.style.background = "var(--status-amber)";
        if (beaconStatusText) beaconStatusText.textContent = "Standby";

        // Update Metric Grid
        if (metricFlowTab) {
          metricFlowTab.innerHTML = `<span style="color:var(--status-rose)">○</span> Closed`;
        }
        if (btnFocusFlowTab) btnFocusFlowTab.style.display = "none";
      }
    } catch {
      if (metricFlowTab) metricFlowTab.textContent = "Checking...";
    }

    // 2. Check Local Bridge Daemon (Port 8791)
    try {
      const bridgeInfo = await chrome.runtime.sendMessage({ t: "bridge.get" }).catch(() => null);
      const isBridgeActive = !!bridgeInfo?.connected;

      if (metricBridge) {
        if (isBridgeActive) {
          metricBridge.innerHTML = `<span style="color:var(--status-emerald)">●</span> Online (8791)`;
        } else {
          metricBridge.innerHTML = `<span style="color:var(--text-muted)">○</span> Standby`;
        }
      }

      // Proactive AI Setup Suggestion Card Update (Onboarding & UX Feedback)
      if (aiSetupSmartBanner) {
        if (isBridgeActive) {
          aiSetupSmartBanner.className = "ai-setup-card connected";
          if (aiSetupIcon) aiSetupIcon.textContent = "⚡";
          if (aiSetupBadge) {
            aiSetupBadge.className = "ai-tag-success";
            aiSetupBadge.textContent = "✅ AI Agent Connected";
          }
          if (aiSetupPulseDot) aiSetupPulseDot.style.display = "none";
          if (aiSetupTitle) aiSetupTitle.textContent = "AI Agent Connected & Ready";
          if (aiSetupSubtitle) aiSetupSubtitle.textContent = "Daemon active on Port 8791 (Claude Code / Cursor / Antigravity)";
          if (aiSetupActionArea) aiSetupActionArea.style.display = "none";
          if (aiConnectedSuccessArea) aiConnectedSuccessArea.style.display = "flex";
        } else {
          aiSetupSmartBanner.className = "ai-setup-card disconnected";
          if (aiSetupIcon) aiSetupIcon.textContent = "🤖";
          if (aiSetupBadge) {
            aiSetupBadge.className = "ai-tag-warning";
            aiSetupBadge.textContent = "⚠️ AI Agent Not Connected";
          }
          if (aiSetupPulseDot) aiSetupPulseDot.style.display = "block";
          if (aiSetupTitle) aiSetupTitle.textContent = "Connect Your AI Agent";
          if (aiSetupSubtitle) aiSetupSubtitle.textContent = "Extension Suggestion: Copy prompt & paste in your AI Agent";
          if (aiSetupActionArea) aiSetupActionArea.style.display = "flex";
          if (aiConnectedSuccessArea) aiConnectedSuccessArea.style.display = "none";
        }
      }
    } catch {}

    // 3. Check Queue Activity
    try {
      const queueInfo = await chrome.runtime.sendMessage({ t: "queue.get" }).catch(() => null);
      if (metricQueue) {
        if (queueInfo?.running) {
          metricQueue.innerHTML = `<span style="color:var(--accent-cyan)">⚡</span> Generating...`;
        } else {
          const queuedCount = (queueInfo?.jobs || []).filter(j => j.status === "queued").length;
          if (queuedCount > 0) {
            metricQueue.innerHTML = `<span style="color:var(--status-amber)">●</span> Queued (${queuedCount})`;
          } else {
            metricQueue.innerHTML = `<span style="color:var(--status-emerald)">●</span> Idle (Ready)`;
          }
        }
      }
    } catch {}
  }

  // Initial Poll & Regular Interval
  pollSystemStatus();
  setInterval(pollSystemStatus, 2400);

  // ─── Flow Tab Launch / Switch Action ─────────────────────────
  async function activateFlowTab() {
    if (currentFlowTab?.id) {
      await chrome.tabs.update(currentFlowTab.id, { active: true });
      if (currentFlowTab.windowId) {
        await chrome.windows.update(currentFlowTab.windowId, { focused: true });
      }
      triggerToast("🎯 Focused Google Flow Tab");
    } else {
      await chrome.tabs.create({ url: "https://flow.google.com" });
      triggerToast("🌐 Opening Google Flow...");
    }
  }

  if (btnFlowAction) btnFlowAction.addEventListener("click", activateFlowTab);
  if (btnLaunchFlow) btnLaunchFlow.addEventListener("click", activateFlowTab);
  if (btnFocusFlowTab) btnFocusFlowTab.addEventListener("click", activateFlowTab);

  // ─── Mode & Aspect Toggles ───────────────────────────────────
  modePills.forEach(pill => {
    pill.addEventListener("click", () => {
      modePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeMode = pill.getAttribute("data-mode");
      triggerToast(`Switched to ${activeMode === 'video' ? '🎬 AI Video (Veo)' : '🖼️ AI Image'} Mode`);
    });
  });

  aspectPills.forEach(pill => {
    pill.addEventListener("click", () => {
      aspectPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeAspect = pill.getAttribute("data-aspect");
      triggerToast(`Format: ${activeAspect}`);
    });
  });

  // ─── Inspiration Chips Click (Micro-Spell) ───────────────────
  inspirationChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const selectedPrompt = chip.getAttribute("data-prompt") || chip.textContent;
      if (promptInput) {
        promptInput.value = selectedPrompt;
        updateCharDisplay();
        promptInput.focus();
        triggerToast("✨ Inspiration Loaded into Prompt Box!");
      }
    });
  });

  function updateCharDisplay() {
    if (!promptInput || !charCounterText) return;
    const len = promptInput.value.length;
    charCounterText.textContent = `${len} characters`;
  }

  if (promptInput) {
    promptInput.addEventListener("input", updateCharDisplay);
    // Keyboard shortcut UX: Ctrl+Enter or Cmd+Enter to generate
    promptInput.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        triggerFlowGeneration(false);
      }
    });
  }

  if (btnTextClear) {
    btnTextClear.addEventListener("click", () => {
      if (promptInput) {
        promptInput.value = "";
        updateCharDisplay();
        triggerToast("Prompt Cleared");
      }
    });
  }

  // ─── In-Flow Prompt Injection & Generation ───────────────────
  async function triggerFlowGeneration(pasteOnly = false) {
    const promptText = promptInput ? promptInput.value.trim() : "";
    if (!promptText) {
      triggerToast("⚠️ Please enter a prompt first!", true);
      if (promptInput) promptInput.focus();
      return;
    }

    const flowTabs = await chrome.tabs.query({ url: "https://flow.google.com/*" });
    if (!flowTabs || flowTabs.length === 0) {
      triggerToast("Opening Google Flow... Sign in then try again.", true);
      await chrome.tabs.create({ url: "https://flow.google.com" });
      return;
    }

    const targetTab = flowTabs[0];
    await chrome.tabs.update(targetTab.id, { active: true });
    if (targetTab.windowId) {
      await chrome.windows.update(targetTab.windowId, { focused: true });
    }

    try {
      triggerToast("Injecting prompt into Google Flow...");
      await chrome.tabs.sendMessage(targetTab.id, {
        t: "dom.dump",
        action: "test_paste",
        prompt: promptText
      });

      if (pasteOnly) {
        triggerToast("✅ Prompt pasted into Flow! Review and generate.");
        return;
      }

      // Small delay for ProseMirror to settle
      setTimeout(async () => {
        try {
          await chrome.tabs.sendMessage(targetTab.id, {
            t: "dom.dump",
            action: "trigger_click"
          });
          triggerToast("🚀 Generation Started in Google Flow!");
        } catch {
          triggerToast("Prompt ready in Flow. Hit Enter to generate!");
        }
      }, 450);
    } catch {
      triggerToast("⚠️ Please reload your Google Flow tab and retry.", true);
    }
  }

  if (btnExecuteGen) btnExecuteGen.addEventListener("click", () => triggerFlowGeneration(false));
  if (btnPasteReview) btnPasteReview.addEventListener("click", () => triggerFlowGeneration(true));

  // ─── DOM Diagnosis & Health Check ───────────────────────────
  if (btnDomDiagnosis) {
    btnDomDiagnosis.addEventListener("click", async () => {
      if (!domDiagnosisBox) return;
      domDiagnosisBox.style.display = "block";
      domDiagnosisBox.innerHTML = "<div style='color:#38bdf8; display:flex; align-items:center; gap:6px;'><span>🔍</span> Checking Google Flow page & DOM elements...</div>";

      try {
        const flowTabs = await chrome.tabs.query({ url: "https://flow.google.com/*" });
        if (!flowTabs || flowTabs.length === 0) {
          domDiagnosisBox.innerHTML = `
            <div style="color:var(--status-amber); padding:6px 0;">
              ⚠️ No active Google Flow tab found. Please click <strong>Open flow.google.com</strong> above.
            </div>`;
          return;
        }

        const flowTab = flowTabs[0];

        // 1. Get Live Page Status directly from content script
        let pageStatus = null;
        try {
          pageStatus = await chrome.tabs.sendMessage(flowTab.id, { t: "page.status" });
        } catch {}

        // 2. Run Healthcheck selectors
        const res = await chrome.runtime.sendMessage({ t: "healthcheck.run" });

        if (res?.ok && res.entries) {
          const matchedEntries = res.entries.filter(e => e.matched);
          const promptEntry = res.entries.find(e => e.key === "promptInput");
          const submitEntry = res.entries.find(e => e.key === "submitButton");
          const attachEntry = res.entries.find(e => e.key === "attachButton");

          const isComposerActive = !!promptEntry?.matched;
          const isLoggedIn = pageStatus?.loggedIn !== false;

          let html = `
            <div style="display:flex; flex-direction:column; gap:7px;">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px;">
                <span style="font-weight:750; color:#fff;">Google Flow Page</span>
                <span style="color:var(--status-emerald); font-weight:700;">✅ Connected</span>
              </div>
              
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="color:var(--text-secondary);">Google Account</span>
                <span style="color:${isLoggedIn ? 'var(--status-emerald)' : 'var(--status-amber)'}; font-weight:700;">
                  ${isLoggedIn ? '✅ Logged In' : '⚠️ Sign-In Required'}
                </span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="color:var(--text-secondary);">Composer Input</span>
                <span style="color:${isComposerActive ? 'var(--status-emerald)' : 'var(--status-amber)'}; font-weight:700;">
                  ${isComposerActive ? '✅ Ready' : 'ℹ️ Open Project'}
                </span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="color:var(--text-secondary);">Generate Button</span>
                <span style="color:${submitEntry?.matched ? 'var(--status-emerald)' : 'var(--status-amber)'}; font-weight:700;">
                  ${submitEntry?.matched ? '✅ Ready' : 'ℹ️ Open Project'}
                </span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="color:var(--text-secondary);">Media Attachments</span>
                <span style="color:${attachEntry?.matched ? 'var(--status-emerald)' : '#94a3b8'}; font-weight:700;">
                  ${attachEntry?.matched ? '✅ Supported' : '○ Standby'}
                </span>
              </div>

              ${!isComposerActive ? `
                <div style="margin-top:4px; padding:7px 9px; background:rgba(56,189,248,0.08); border-radius:6px; border:1px solid rgba(56,189,248,0.22); color:#bae6fd; font-size:11px; line-height:1.45;">
                  💡 <strong>Tip:</strong> If you are on the Flow home screen, click on any project or click <strong>"+ New Project"</strong> in Flow to open the composer!
                </div>
              ` : `
                <div style="margin-top:4px; padding:7px 9px; background:rgba(16,185,129,0.08); border-radius:6px; border:1px solid rgba(16,185,129,0.25); color:#a7f3d0; font-size:11px;">
                  🎉 <strong>All Systems Ready:</strong> Prompt composer is active and ready for generations.
                </div>
              `}

              <div style="display:flex; justify-content:space-between; font-size:10.5px; color:var(--text-muted); padding-top:4px; border-top:1px solid rgba(255,255,255,0.06);">
                <span>Selectors: ${matchedEntries.length}/${res.entries.length} active</span>
                <span style="color:#38bdf8;">v1.0 Verified</span>
              </div>
            </div>
          `;

          domDiagnosisBox.innerHTML = html;
          triggerToast("Health Check Finished!");
        } else {
          domDiagnosisBox.innerHTML = `
            <div style="color:var(--status-amber); padding:6px 0;">
              ⚠️ Please open flow.google.com and sign in first.
            </div>`;
        }
      } catch (err) {
        domDiagnosisBox.innerHTML = `<div style="color:var(--status-rose); padding:6px 0;">Diagnosis error: ${err.message}</div>`;
      }
    });
  }

  // ─── Queue Controls ─────────────────────────────────────────
  if (btnPauseProcess) {
    btnPauseProcess.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.pause" }).catch(() => null);
      triggerToast("Queue Paused");
      pollSystemStatus();
    });
  }

  if (btnResumeProcess) {
    btnResumeProcess.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.resume" }).catch(() => null);
      triggerToast("Queue Resumed");
      pollSystemStatus();
    });
  }

  if (btnClearProcess) {
    btnClearProcess.addEventListener("click", async () => {
      const res = await chrome.runtime.sendMessage({ t: "queue.clearAll" }).catch(() => null);
      triggerToast(`Queue cleared (${res?.cleared || 0} removed)`);
      pollSystemStatus();
    });
  }

  // ─── Copy Agent Setup Prompt (Smart Suggestion Action) ─────────
  const agentPromptCode = `I am using Flow Connector (Chrome Extension created by Mirza Ahmed Hassan) to generate AI images and Veo videos via Google Flow.
Local Bridge Daemon: Running on 127.0.0.1:8791 (WebSocket)
MCP Server Tools: flow_status, flow_generate, flow_generate_image, flow_generate_video, flow_download, flow_wait, flow_cancel, flow_retry, flow_assets, flow_trash
CLI Command: flow-auto (e.g., flow-auto status, flow-auto image --prompt "...", flow-auto video --prompt "...")
Please run a quick status check with 'flow_status' or 'flow-auto status' and let me know when you are ready to assist with high-resolution cinematic prompts!`;

  function copyPromptWithFeedback(triggerBtn, labelElem, defaultText) {
    navigator.clipboard.writeText(agentPromptCode).then(() => {
      if (labelElem) labelElem.textContent = "✨ Copied! Ab Agent me Paste karein!";
      triggerToast("🎉 Prompt Copied! Paste into Claude Code, Cursor or Antigravity!");
      setTimeout(() => {
        if (labelElem) labelElem.textContent = defaultText;
      }, 3500);
    }).catch(() => {
      triggerToast("⚠️ Failed to copy prompt to clipboard", true);
    });
  }

  if (btnQuickCopyAgentPrompt) {
    btnQuickCopyAgentPrompt.addEventListener("click", () => {
      copyPromptWithFeedback(btnQuickCopyAgentPrompt, btnCopyPromptLabel, "Copy Setup Prompt for AI Agent");
    });
  }

  if (btnRecopyPrompt) {
    btnRecopyPrompt.addEventListener("click", () => {
      copyPromptWithFeedback(btnRecopyPrompt, null, "");
    });
  }

  if (btnCopySetupCode) {
    btnCopySetupCode.addEventListener("click", () => {
      copyPromptWithFeedback(btnCopySetupCode, null, "");
    });
  }

  // ─── Quality Switches Persistence ────────────────────────────
  const STORAGE_2K = "fa:image2k";
  const STORAGE_1080P = "fa:video1080p";
  const STORAGE_NEW = "fa:newProjectDefault";

  chrome.storage.local.get([STORAGE_2K, STORAGE_1080P, STORAGE_NEW], (vals) => {
    if (switch2k) switch2k.checked = !!vals[STORAGE_2K];
    if (switch1080p) switch1080p.checked = !!vals[STORAGE_1080P];
    if (switchNewProject) switchNewProject.checked = !!vals[STORAGE_NEW];
  });

  if (switch2k) {
    switch2k.addEventListener("change", (e) => {
      chrome.storage.local.set({ [STORAGE_2K]: e.target.checked });
      triggerToast(`2K Image: ${e.target.checked ? 'Enabled' : 'Disabled'}`);
    });
  }

  if (switch1080p) {
    switch1080p.addEventListener("change", (e) => {
      chrome.storage.local.set({ [STORAGE_1080P]: e.target.checked });
      triggerToast(`1080p Video: ${e.target.checked ? 'Enabled' : 'Disabled'}`);
    });
  }

  if (switchNewProject) {
    switchNewProject.addEventListener("change", (e) => {
      chrome.storage.local.set({ [STORAGE_NEW]: e.target.checked });
      triggerToast(`New Project per run: ${e.target.checked ? 'Enabled' : 'Disabled'}`);
    });
  }
});
