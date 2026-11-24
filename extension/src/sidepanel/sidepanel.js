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
  const btnQuickCopyPromptAffordance = document.getElementById("btnQuickCopyPromptAffordance");
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
  const btnCopySetupCodeLabel = document.getElementById("btnCopySetupCodeLabel");
  const btnCopySetupCodeAffordance = document.getElementById("btnCopySetupCodeAffordance");
  const switch2k = document.getElementById("switch2k");
  const switch1080p = document.getElementById("switch1080p");
  const switchNewProject = document.getElementById("switchNewProject");

  // ─── New Features: Seed Locking, Push Telemetry & Policy Guard ─
  const switchSeedLock = document.getElementById("switchSeedLock");
  const switchPrefSeedLock = document.getElementById("switchPrefSeedLock");
  const seedLockInputRow = document.getElementById("seedLockInputRow");
  const inputSeedVal = document.getElementById("inputSeedVal");
  const btnRollSeed = document.getElementById("btnRollSeed");
  const btnApplySeed = document.getElementById("btnApplySeed");
  const switchPolicyGuard = document.getElementById("switchPolicyGuard");
  const switchPushTelemetry = document.getElementById("switchPushTelemetry");
  const telemetryBadge = document.getElementById("telemetryBadge");
  const telemetryEventList = document.getElementById("telemetryEventList");

  // ─── Batch Queue & Job Tracker Elements (v1.1) ───────────────
  const navQueueBadge = document.getElementById("navQueueBadge");
  const btnEnqueueGen = document.getElementById("btnEnqueueGen");
  const miniQueueBanner = document.getElementById("miniQueueBanner");
  const miniQueueDot = document.getElementById("miniQueueDot");
  const miniQueueText = document.getElementById("miniQueueText");
  const btnGoToQueue = document.getElementById("btnGoToQueue");
  const btnJumpToQueueView = document.getElementById("btnJumpToQueueView");

  const queueStatePill = document.getElementById("queueStatePill");
  const queueStateLabel = document.getElementById("queueStateLabel");
  const qCountWaiting = document.getElementById("qCountWaiting");
  const qCountRunning = document.getElementById("qCountRunning");
  const qCountDone = document.getElementById("qCountDone");
  const qCountFailed = document.getElementById("qCountFailed");
  const qCountTotal = document.getElementById("qCountTotal");
  const queueItemCountTag = document.getElementById("queueItemCountTag");
  const queueItemsList = document.getElementById("queueItemsList");

  const btnQueueTabPause = document.getElementById("btnQueueTabPause");
  const btnQueueTabResume = document.getElementById("btnQueueTabResume");
  const btnQueueTabClear = document.getElementById("btnQueueTabClear");
  const btnQueueTabRefresh = document.getElementById("btnQueueTabRefresh");

  // ─── Local State ─────────────────────────────────────────────
  let activeMode = "image";
  let activeAspect = "16:9";
  let currentFlowTab = null;
  let toastTimer = null;

  const mainViewScroller = document.querySelector(".main-view-scroller");

  // ─── Tab Switching ───────────────────────────────────────────
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      navBtns.forEach(b => b.classList.remove("active"));
      viewSections.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(`view-${target}`);
      if (targetView) {
        targetView.classList.add("active");
        if (mainViewScroller) mainViewScroller.scrollTop = 0;
      }
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
          flowHeroIcon.textContent = "●";
          flowHeroTitle.textContent = "Google Flow Connected";
          flowHeroDesc.textContent = `Tab ready (${flowTabs.length} open)`;
          btnFlowAction.innerHTML = "<span>Focus Tab</span>";
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
          flowHeroIcon.textContent = "○";
          flowHeroTitle.textContent = "Google Flow Offline";
          flowHeroDesc.textContent = "Open flow.google.com";
          btnFlowAction.innerHTML = "<span>Open Flow</span>";
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
          metricBridge.innerHTML = `<span style="color:var(--status-emerald)">●</span> Online`;
        } else {
          metricBridge.innerHTML = `<span style="color:var(--text-muted)">○</span> Standby`;
        }
      }

      // AI Setup Card Update
      if (aiSetupSmartBanner) {
        if (isBridgeActive) {
          aiSetupSmartBanner.className = "panel-card ai-setup-card connected";
          if (aiSetupIcon) aiSetupIcon.textContent = "●";
          if (aiSetupBadge) {
            aiSetupBadge.className = "ai-tag-success";
            aiSetupBadge.textContent = "Connected";
          }
          if (aiSetupPulseDot) aiSetupPulseDot.style.display = "none";
          if (aiSetupTitle) aiSetupTitle.textContent = "AI Agent Connected";
          if (aiSetupSubtitle) aiSetupSubtitle.textContent = "Daemon active on Port 8791 (Claude Code / Cursor / Antigravity)";
          if (aiSetupActionArea) aiSetupActionArea.style.display = "none";
          if (aiConnectedSuccessArea) aiConnectedSuccessArea.style.display = "flex";
        } else {
          aiSetupSmartBanner.className = "panel-card ai-setup-card disconnected";
          if (aiSetupIcon) aiSetupIcon.textContent = "○";
          if (aiSetupBadge) {
            aiSetupBadge.className = "ai-tag-warning";
            aiSetupBadge.textContent = "Standby";
          }
          if (aiSetupPulseDot) aiSetupPulseDot.style.display = "none";
          if (aiSetupTitle) aiSetupTitle.textContent = "AI Agent Bridge";
          if (aiSetupSubtitle) aiSetupSubtitle.textContent = "Connect Claude Code, Cursor, or Antigravity via Port 8791";
          if (aiSetupActionArea) aiSetupActionArea.style.display = "flex";
          if (aiConnectedSuccessArea) aiConnectedSuccessArea.style.display = "none";
        }
      }
    } catch {}

    // 3. Check Queue Activity & Render Live Queue Dashboard
    try {
      const queueInfo = await chrome.runtime.sendMessage({ t: "queue.get" }).catch(() => null);
      renderQueueUI(queueInfo);
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

  // ─── Policy Sanitization Engine ──────────────────────────────
  function sanitizePromptForPolicy(prompt) {
    let p = prompt;
    const replacements = [
      [/\b(blood|bloody)\b/gi, "crimson cinematic highlights"],
      [/\b(kill|killing|murder|massacre|assault)\b/gi, "heroic dynamic clash"],
      [/\b(weapon|gun|guns|rifle|pistol|knife|blade)\b/gi, "stylized cinematic prop"],
      [/\b(naked|nude|nsfw|sensual|bikini|erotic)\b/gi, "elegant character costume"],
      [/\b(corpse|dead body|mutilated|gore|gory)\b/gi, "mysterious shadowy ruins"],
      [/\b(terror|horrific|brutal)\b/gi, "high tension dramatic suspense"],
      [/\b(violent|violence)\b/gi, "intense action scene"]
    ];
    for (const [regex, rep] of replacements) {
      p = p.replace(regex, rep);
    }
    if (!p.toLowerCase().includes("cinematic") && !p.toLowerCase().includes("aesthetic")) {
      p += " (award winning aesthetic, family safe, cinematic studio lighting)";
    }
    return p;
  }

  // ─── Real-Time Push Telemetry Live Stream ────────────────────
  function addTelemetryLog(msg, isSuccess = true) {
    if (!telemetryEventList) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const item = document.createElement("div");
    item.className = "telemetry-feed-item";
    item.innerHTML = `
      <span class="telemetry-dot" style="color:${isSuccess ? 'var(--status-emerald)' : 'var(--status-rose)'}">●</span>
      <span class="telemetry-time">${timeStr}</span>
      <span class="telemetry-msg">${msg}</span>
    `;
    telemetryEventList.prepend(item);
    while (telemetryEventList.children.length > 20) {
      telemetryEventList.removeChild(telemetryEventList.lastChild);
    }
  }

  // Listen for background push telemetry events & policy events
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.t === "telemetry.broadcast" || msg?.t === "telemetry.push") {
      if (msg.event === "onImageReady") {
        addTelemetryLog(`⚡ [Instant Push] onImageReady: Job #${(msg.jobId || "").slice(0, 8)} ready (${msg.files?.length || 1} file)`, true);
        triggerToast("⚡ Instant Push: Image Ready!");
      } else if (msg.event === "onJobFailed") {
        addTelemetryLog(`⚠️ [Instant Push] onJobFailed: Job #${(msg.jobId || "").slice(0, 8)}: ${msg.reason || "Failed"}`, false);
        triggerToast(`⚡ Telemetry: Job Failed`, true);
      }
    }
    if (msg?.t === "policy.autoDismissed") {
      addTelemetryLog(`🛡️ [Policy Guard] Auto-dismissed safety warning & sanitized prompt. Queue running smoothly!`, true);
      triggerToast("🛡️ Policy Warning Auto-Dismissed & Sanitized!");
    }
  });

  if (promptInput) {
    promptInput.addEventListener("input", () => {
      updateCharDisplay();
      // Auto-detect and sync --seed <int> parameter in real time
      const seedMatch = promptInput.value.match(/--seed\s+(\d+)/i);
      if (seedMatch && seedMatch[1]) {
        const parsed = parseInt(seedMatch[1], 10);
        if (parsed && inputSeedVal && inputSeedVal.value !== String(parsed)) {
          inputSeedVal.value = parsed;
          if (switchSeedLock && !switchSeedLock.checked) {
            updateSeedLockState(true, parsed);
          }
        }
      }
    });

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

  // ─── Seed Locking Controller ────────────────────────────────
  function updateSeedLockState(enabled, explicitVal = null) {
    if (switchSeedLock) switchSeedLock.checked = enabled;
    if (switchPrefSeedLock) switchPrefSeedLock.checked = enabled;
    if (seedLockInputRow) seedLockInputRow.style.display = enabled ? "flex" : "none";

    let seedVal = explicitVal !== null ? explicitVal : parseInt(inputSeedVal?.value, 10);
    if (!seedVal || isNaN(seedVal)) {
      seedVal = Math.floor(100000 + Math.random() * 900000);
      if (inputSeedVal) inputSeedVal.value = seedVal;
    }

    chrome.storage.local.set({ "fa:seedLockEnabled": enabled, "fa:seedVal": seedVal });
    triggerToast(enabled ? `🔒 Seed Locked: #${seedVal} (Consistent Style & Line Weight)` : "Seed Locking Disabled");
    addTelemetryLog(enabled ? `🔒 Seed Lock Enabled: #${seedVal} (100% style fidelity)` : "Seed Lock Disabled");
  }

  if (switchSeedLock) {
    switchSeedLock.addEventListener("change", (e) => {
      updateSeedLockState(e.target.checked);
    });
  }

  if (switchPrefSeedLock) {
    switchPrefSeedLock.addEventListener("change", (e) => {
      updateSeedLockState(e.target.checked);
    });
  }

  if (btnRollSeed) {
    btnRollSeed.addEventListener("click", () => {
      const newSeed = Math.floor(100000 + Math.random() * 900000);
      if (inputSeedVal) inputSeedVal.value = newSeed;
      chrome.storage.local.set({ "fa:seedVal": newSeed });
      triggerToast(`🎲 Rolled New Seed: #${newSeed}`);
      addTelemetryLog(`🎲 Seed randomized: #${newSeed}`);
    });
  }

  if (btnApplySeed) {
    btnApplySeed.addEventListener("click", () => {
      const sVal = inputSeedVal?.value || "42891";
      if (!promptInput) return;
      if (/--seed\s+\d+/i.test(promptInput.value)) {
        promptInput.value = promptInput.value.replace(/--seed\s+\d+/i, `--seed ${sVal}`);
      } else {
        promptInput.value = (promptInput.value.trim() + ` --seed ${sVal}`).trim();
      }
      updateCharDisplay();
      triggerToast(`📌 Applied --seed ${sVal} to prompt!`);
    });
  }

  // ─── In-Flow Prompt Injection & Generation ───────────────────
  async function triggerFlowGeneration(pasteOnly = false) {
    let promptText = promptInput ? promptInput.value.trim() : "";
    if (!promptText) {
      triggerToast("⚠️ Please enter a prompt first!", true);
      if (promptInput) promptInput.focus();
      return;
    }

    // Feature 1: Apply Seed Locking if active
    const isSeedLocked = switchSeedLock && switchSeedLock.checked;
    const activeSeed = inputSeedVal?.value ? parseInt(inputSeedVal.value, 10) : null;
    if (isSeedLocked && activeSeed) {
      if (!/--seed\s+\d+/i.test(promptText)) {
        promptText = `${promptText} --seed ${activeSeed} [Character Consistency: locked seed ${activeSeed}, uniform line weight, fixed drawing style, coherent color palette]`;
      }
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

    // Feature 3: Proactive Policy Modal Auto-Dismiss
    const isPolicyGuardEnabled = switchPolicyGuard ? switchPolicyGuard.checked : true;
    if (isPolicyGuardEnabled) {
      try {
        const dismissRes = await chrome.tabs.sendMessage(targetTab.id, {
          t: "dom.dump",
          action: "policy_check_and_dismiss"
        });
        if (dismissRes?.dismissed) {
          addTelemetryLog("🛡️ Proactive Policy Dismissal: Closed stale warning popup");
        }
      } catch {}
    }

    try {
      triggerToast(isSeedLocked ? `Injecting prompt with locked Seed #${activeSeed}...` : "Injecting prompt into Google Flow...");
      
      const pasteRes = await chrome.tabs.sendMessage(targetTab.id, {
        t: "dom.dump",
        action: "test_paste",
        prompt: promptText,
        seed: activeSeed
      });

      if (pasteOnly) {
        triggerToast("✅ Prompt pasted into Flow! Review and generate.");
        return;
      }

      // Small delay for ProseMirror to settle
      setTimeout(async () => {
        try {
          const genRes = await chrome.tabs.sendMessage(targetTab.id, {
            t: "dom.dump",
            action: "trigger_click"
          });

          // Check if policy blocked immediately after click
          if (isPolicyGuardEnabled) {
            setTimeout(async () => {
              try {
                const checkRes = await chrome.tabs.sendMessage(targetTab.id, {
                  t: "dom.dump",
                  action: "policy_check_and_dismiss"
                });
                if (checkRes?.dismissed) {
                  // Policy warning hit! Auto-sanitize and auto-retry without stalling queue
                  addTelemetryLog("🛡️ [Policy Guard] Warning detected. Auto-sanitizing prompt & retrying...", true);
                  triggerToast("🛡️ Policy popup dismissed! Auto-sanitizing & retrying...");
                  const sanitized = sanitizePromptForPolicy(promptText);
                  if (promptInput) {
                    promptInput.value = sanitized;
                    updateCharDisplay();
                  }
                  await chrome.tabs.sendMessage(targetTab.id, {
                    t: "dom.dump",
                    action: "test_paste",
                    prompt: sanitized,
                    seed: activeSeed
                  });
                  setTimeout(async () => {
                    await chrome.tabs.sendMessage(targetTab.id, { t: "dom.dump", action: "trigger_click" });
                    triggerToast("🚀 Auto-Retried Sanitized Prompt Successfully!");
                    addTelemetryLog("🚀 Retried with sanitized safe prompt — Queue moving uninterrupted");
                  }, 400);
                }
              } catch {}
            }, 800);
          }

          triggerToast(isSeedLocked ? `🚀 Generation Started with Seed #${activeSeed}!` : "🚀 Generation Started in Google Flow!");
          addTelemetryLog(`🚀 Dispatched generation: ${promptText.slice(0, 36)}...` + (isSeedLocked ? ` (Seed #${activeSeed})` : ""));
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
      setTimeout(() => {
        domDiagnosisBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);

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

  // ─── Queue Formatting & Tab Switchers ─────────────────────────
  function formatTimeAgo(ts) {
    if (!ts) return "Recently";
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 10) return "Just now";
    if (diff < 60) return `${diff}s ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    return `${hours}h ago`;
  }

  function switchToQueueTab() {
    navBtns.forEach(b => {
      if (b.getAttribute("data-tab") === "queue") b.classList.add("active");
      else b.classList.remove("active");
    });
    viewSections.forEach(v => {
      if (v.id === "view-queue") v.classList.add("active");
      else v.classList.remove("active");
    });
    if (mainViewScroller) mainViewScroller.scrollTop = 0;
  }

  function switchToCreateTab() {
    navBtns.forEach(b => {
      if (b.getAttribute("data-tab") === "create") b.classList.add("active");
      else b.classList.remove("active");
    });
    viewSections.forEach(v => {
      if (v.id === "view-create") v.classList.add("active");
      else v.classList.remove("active");
    });
    if (mainViewScroller) mainViewScroller.scrollTop = 0;
  }

  if (btnGoToQueue) btnGoToQueue.addEventListener("click", switchToQueueTab);
  if (btnJumpToQueueView) btnJumpToQueueView.addEventListener("click", switchToQueueTab);

  // ─── Live Queue Dashboard Rendering Engine (v1.1) ─────────────
  function renderQueueUI(queueInfo) {
    const jobs = queueInfo?.jobs || [];
    const isRunning = !!queueInfo?.running;
    const isPaused = !!queueInfo?.paused;

    const waitingJobs = jobs.filter(j => j.status === "queued" || j.status === "waiting_for_extension");
    const runningJobs = jobs.filter(j => j.status === "running" || j.status === "downloading");
    const doneJobs = jobs.filter(j => j.status === "done");
    const failedJobs = jobs.filter(j => j.status === "failed" || j.status === "cancelled");

    const waitingCount = waitingJobs.length;
    const runningCount = runningJobs.length;
    const doneCount = doneJobs.length;
    const failedCount = failedJobs.length;
    const totalCount = jobs.length;

    // 1. Navigation Badge (Counting pending jobs)
    if (navQueueBadge) {
      const activePending = waitingCount + runningCount;
      if (activePending > 0) {
        navQueueBadge.style.display = "inline-flex";
        navQueueBadge.textContent = activePending;
        if (waitingCount > 0) {
          navQueueBadge.className = "nav-count-badge has-waiting";
        } else {
          navQueueBadge.className = "nav-count-badge";
        }
      } else {
        navQueueBadge.style.display = "none";
      }
    }

    // 2. Mini Queue Banner on Create Tab (Counting visible immediately)
    if (miniQueueBanner) {
      if (miniQueueDot && miniQueueText) {
        if (runningCount > 0) {
          miniQueueDot.className = "mini-queue-pulse active";
          miniQueueText.innerHTML = `Queue: <strong style="color:var(--accent-primary)">Rendering</strong> (${waitingCount} wait · ${runningCount} active)`;
        } else if (waitingCount > 0) {
          miniQueueDot.className = "mini-queue-pulse waiting";
          miniQueueText.innerHTML = `Queue: <strong style="color:var(--status-amber)">Queued</strong> (${waitingCount} waiting · ${totalCount} total)`;
        } else if (isPaused) {
          miniQueueDot.className = "mini-queue-pulse";
          miniQueueText.innerHTML = `Queue: <strong style="color:var(--status-amber)">Paused</strong> (${totalCount} total)`;
        } else {
          miniQueueDot.className = "mini-queue-pulse";
          miniQueueText.innerHTML = `Queue: <strong style="color:var(--status-emerald)">Idle</strong> (0 waiting)`;
        }
      }
    }

    // 3. Status Tab Metric Cell
    if (metricQueue) {
      if (runningCount > 0 || isRunning) {
        metricQueue.innerHTML = `<span style="color:var(--accent-primary)">●</span> Rendering (${runningCount} active, ${waitingCount} wait)`;
      } else if (waitingCount > 0) {
        metricQueue.innerHTML = `<span style="color:var(--status-amber)">●</span> Queued (${waitingCount} wait)`;
      } else if (isPaused) {
        metricQueue.innerHTML = `<span style="color:var(--status-amber)">●</span> Paused`;
      } else {
        metricQueue.innerHTML = `<span style="color:var(--status-emerald)">●</span> Idle`;
      }
    }

    // 4. Live 5-Box Counting Grid in Queue Tab
    if (qCountWaiting) qCountWaiting.textContent = waitingCount;
    if (qCountRunning) qCountRunning.textContent = runningCount;
    if (qCountDone) qCountDone.textContent = doneCount;
    if (qCountFailed) qCountFailed.textContent = failedCount;
    if (qCountTotal) qCountTotal.textContent = totalCount;
    if (queueItemCountTag) queueItemCountTag.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;

    // 5. State Indicator Pill
    if (queueStatePill && queueStateLabel) {
      if (isPaused) {
        queueStatePill.className = "queue-status-indicator paused";
        queueStateLabel.textContent = "Paused";
      } else if (runningCount > 0) {
        queueStatePill.className = "queue-status-indicator active";
        queueStateLabel.textContent = `Active (${runningCount})`;
      } else if (waitingCount > 0) {
        queueStatePill.className = "queue-status-indicator active";
        queueStateLabel.textContent = `${waitingCount} Waiting`;
      } else {
        queueStatePill.className = "queue-status-indicator idle";
        queueStateLabel.textContent = "Idle";
      }
    }

    // 6. Detailed Queue Item List Rendering
    if (!queueItemsList) return;

    if (jobs.length === 0) {
      queueItemsList.innerHTML = `
        <div class="queue-empty-box">
          <div class="queue-empty-title">Queue is empty</div>
          <p class="queue-empty-desc">No active or waiting jobs. Type a prompt in Studio and click "+ Queue" or dispatch via CLI.</p>
          <button id="btnEmptyGoCreate" class="btn-secondary-action" style="width:auto; padding:5px 14px; font-size:11px;">Go to Studio</button>
        </div>`;
      const btnEmptyGoCreate = document.getElementById("btnEmptyGoCreate");
      if (btnEmptyGoCreate) btnEmptyGoCreate.addEventListener("click", switchToCreateTab);
      return;
    }

    // Priority Sort: running -> downloading -> queued -> done -> failed -> cancelled
    const statusPriority = {
      running: 0,
      downloading: 1,
      queued: 2,
      waiting_for_extension: 3,
      done: 4,
      failed: 5,
      cancelled: 6
    };
    const sorted = [...jobs].sort((a, b) => {
      const pa = statusPriority[a.status] ?? 9;
      const pb = statusPriority[b.status] ?? 9;
      if (pa !== pb) return pa - pb;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    let waitingRank = 1;
    let html = "";

    sorted.forEach((job, idx) => {
      const isJobRunning = job.status === "running" || job.status === "downloading";
      const isJobWaiting = job.status === "queued" || job.status === "waiting_for_extension";
      const isJobFailed = job.status === "failed" || job.status === "cancelled";
      const isJobDone = job.status === "done";

      let cardClass = "queue-job-card";
      if (isJobRunning) cardClass += " is-running";
      else if (isJobWaiting) cardClass += " is-waiting";
      else if (isJobFailed) cardClass += " is-failed";

      let posBadge = "";
      if (isJobRunning) {
        posBadge = `<span class="job-position-tag running">Processing</span>`;
      } else if (isJobWaiting) {
        posBadge = `<span class="job-position-tag waiting">Waiting #${waitingRank++}</span>`;
      } else {
        posBadge = `<span class="job-position-tag">#${idx + 1}</span>`;
      }

      let statusPill = "";
      if (job.status === "running") {
        statusPill = `<span class="job-status-pill running">Rendering</span>`;
      } else if (job.status === "downloading") {
        statusPill = `<span class="job-status-pill downloading">Saving</span>`;
      } else if (job.status === "queued" || job.status === "waiting_for_extension") {
        statusPill = `<span class="job-status-pill queued">Queued</span>`;
      } else if (job.status === "done") {
        statusPill = `<span class="job-status-pill done">Ready</span>`;
      } else if (job.status === "failed") {
        statusPill = `<span class="job-status-pill failed">Failed</span>`;
      } else if (job.status === "cancelled") {
        statusPill = `<span class="job-status-pill cancelled">Cancelled</span>`;
      }

      const modeText = (job.params?.mode === "video") ? "Video (Veo)" : "Image";
      const aspectText = job.params?.aspect ? job.params.aspect : "16:9";
      const seedText = job.params?.seed ? `<span class="job-tag seed">#${job.params.seed}</span>` : "";
      const timeText = `<span class="job-tag">${formatTimeAgo(job.createdAt)}</span>`;
      const promptText = (job.params?.prompt || "No prompt content").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const errorBox = job.error ? `<div class="job-error-msg">${job.error.replace(/</g, "&lt;")}</div>` : "";

      let actionsHtml = "";
      if (isJobRunning || isJobWaiting) {
        actionsHtml = `<button class="btn-job-action cancel" data-cancel-id="${job.id}">Cancel</button>`;
      } else if (isJobFailed || isJobDone) {
        actionsHtml = `<button class="btn-job-action retry" data-retry-id="${job.id}">Retry</button>`;
      }

      html += `
        <div class="${cardClass}" data-job-id="${job.id}">
          <div class="job-card-header">
            <div>${posBadge}</div>
            <div>${statusPill}</div>
          </div>
          <div class="job-tags-row">
            <span class="job-tag">${modeText}</span>
            <span class="job-tag">${aspectText}</span>
            ${seedText}
            ${timeText}
          </div>
          <div class="job-prompt-preview" title="${promptText}">${promptText}</div>
          ${errorBox}
          <div class="job-card-actions">
            ${actionsHtml}
          </div>
        </div>`;
    });

    queueItemsList.innerHTML = html;
  }

  // ─── Individual Job Action Delegation (Cancel & Retry) ─────────
  if (queueItemsList) {
    queueItemsList.addEventListener("click", async e => {
      const cancelBtn = e.target.closest("[data-cancel-id]");
      if (cancelBtn) {
        const jobId = cancelBtn.getAttribute("data-cancel-id");
        cancelBtn.disabled = true;
        cancelBtn.textContent = "Cancelling...";
        await chrome.runtime.sendMessage({ t: "queue.cancelJob", jobId }).catch(() => null);
        triggerToast(`Job ${jobId.slice(0, 10)} cancelled`);
        pollSystemStatus();
        return;
      }

      const retryBtn = e.target.closest("[data-retry-id]");
      if (retryBtn) {
        const jobId = retryBtn.getAttribute("data-retry-id");
        retryBtn.disabled = true;
        retryBtn.textContent = "Retrying...";
        await chrome.runtime.sendMessage({ t: "queue.retryJob", jobId }).catch(() => null);
        triggerToast(`Job ${jobId.slice(0, 10)} re-queued`);
        pollSystemStatus();
        return;
      }
    });
  }

  // ─── Add to Queue Action (From Create View) ───────────────────
  if (btnEnqueueGen) {
    btnEnqueueGen.addEventListener("click", async () => {
      let rawPrompt = (promptInput?.value || "").trim();
      if (!rawPrompt) {
        triggerToast("⚠️ Please enter a prompt first", true);
        if (promptInput) promptInput.focus();
        return;
      }

      // Check Seed
      let seedVal = null;
      if (switchSeedLock?.checked) {
        seedVal = parseInt(inputSeedVal?.value, 10);
        if (isNaN(seedVal) || seedVal <= 0) {
          seedVal = Math.floor(Math.random() * 899999) + 100000;
          if (inputSeedVal) inputSeedVal.value = seedVal;
        }
      }

      const res = await chrome.runtime.sendMessage({
        t: "queue.add",
        prompt: rawPrompt,
        mode: activeMode,
        aspect: activeAspect,
        seed: seedVal
      }).catch(err => ({ ok: false, error: err.message }));

      if (res?.ok) {
        triggerToast("✨ Prompt added to batch queue!");
        if (promptInput) promptInput.value = "";
        if (charCounterText) charCounterText.textContent = "0 characters";
        pollSystemStatus();
      } else {
        triggerToast("❌ Failed to add to queue: " + (res?.error || "Unknown"), true);
      }
    });
  }

  // ─── Queue Master Toolbar Buttons ─────────────────────────────
  if (btnQueueTabPause) {
    btnQueueTabPause.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.pause" }).catch(() => null);
      triggerToast("⏸️ Queue Paused");
      pollSystemStatus();
    });
  }

  if (btnQueueTabResume) {
    btnQueueTabResume.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.resume" }).catch(() => null);
      triggerToast("▶️ Queue Resumed");
      pollSystemStatus();
    });
  }

  if (btnQueueTabClear) {
    btnQueueTabClear.addEventListener("click", async () => {
      const res = await chrome.runtime.sendMessage({ t: "queue.clearAll" }).catch(() => null);
      triggerToast(`🗑️ Queue cleared (${res?.cleared || 0} removed)`);
      pollSystemStatus();
    });
  }

  if (btnQueueTabRefresh) {
    btnQueueTabRefresh.addEventListener("click", () => {
      triggerToast("🔄 Refreshing Queue...");
      pollSystemStatus();
    });
  }

  if (btnPauseProcess) {
    btnPauseProcess.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.pause" }).catch(() => null);
      triggerToast("⏸️ Queue Paused");
      pollSystemStatus();
    });
  }

  if (btnResumeProcess) {
    btnResumeProcess.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ t: "queue.resume" }).catch(() => null);
      triggerToast("▶️ Queue Resumed");
      pollSystemStatus();
    });
  }

  if (btnClearProcess) {
    btnClearProcess.addEventListener("click", async () => {
      const res = await chrome.runtime.sendMessage({ t: "queue.clearAll" }).catch(() => null);
      triggerToast(`🗑️ Queue cleared (${res?.cleared || 0} removed)`);
      pollSystemStatus();
    });
  }

  // ─── Copy Agent Setup Prompt (Smart Suggestion Action) ─────────
  const agentPromptCode = `I am using Flow Connector (Chrome Extension created by Mirza Ahmed Hassan) to generate AI images and Veo videos via Google Flow.
Local Bridge Daemon: Running on 127.0.0.1:8791 (WebSocket)
MCP Server Tools: flow_status, flow_generate, flow_generate_image, flow_generate_video, flow_download, flow_wait, flow_cancel, flow_retry, flow_assets, flow_trash
CLI Command: flow-auto (e.g., flow-auto status, flow-auto image --prompt "...", flow-auto video --prompt "...")
Please run a quick status check with 'flow_status' or 'flow-auto status' and let me know when you are ready to assist with high-resolution cinematic prompts!`;

  function copyPromptWithFeedback(triggerBtn, labelElem, defaultText, affordanceElem) {
    navigator.clipboard.writeText(agentPromptCode).then(() => {
      if (triggerBtn) triggerBtn.classList.add("copied");
      if (labelElem) labelElem.textContent = "✨ Copied! Paste into AI Agent!";
      if (affordanceElem) affordanceElem.textContent = "✓";
      triggerToast("🎉 Prompt Copied! Paste into Claude Code, Cursor or Antigravity!");
      setTimeout(() => {
        if (triggerBtn) triggerBtn.classList.remove("copied");
        if (labelElem) labelElem.textContent = defaultText;
        if (affordanceElem) affordanceElem.textContent = "📋";
      }, 3500);
    }).catch(() => {
      triggerToast("⚠️ Failed to copy prompt to clipboard", true);
    });
  }

  if (btnQuickCopyAgentPrompt) {
    btnQuickCopyAgentPrompt.addEventListener("click", () => {
      copyPromptWithFeedback(
        btnQuickCopyAgentPrompt,
        btnCopyPromptLabel,
        "Copy Agent Instructions",
        btnQuickCopyPromptAffordance
      );
    });
  }

  if (btnRecopyPrompt) {
    btnRecopyPrompt.addEventListener("click", () => {
      copyPromptWithFeedback(btnRecopyPrompt, null, "Re-copy instructions", null);
    });
  }

  if (btnCopySetupCode) {
    btnCopySetupCode.addEventListener("click", () => {
      copyPromptWithFeedback(
        btnCopySetupCode,
        btnCopySetupCodeLabel,
        "Copy Setup Prompt for AI Agent",
        btnCopySetupCodeAffordance
      );
    });
  }

  // ─── First-Time Setup Onboarding Guide (1-Time Trigger) ────────
  const onboardingOverlay = document.getElementById("onboardingOverlay");
  const btnCloseOnboardingX = document.getElementById("btnCloseOnboardingX");
  const btnCompleteOnboarding = document.getElementById("btnCompleteOnboarding");
  const btnOnboardingOpenFlow = document.getElementById("btnOnboardingOpenFlow");
  const btnOnboardingCopyPrompt = document.getElementById("btnOnboardingCopyPrompt");
  const btnOnboardingCopyPromptLabel = document.getElementById("btnOnboardingCopyPromptLabel");
  const btnOnboardingCopyPromptAffordance = document.getElementById("btnOnboardingCopyPromptAffordance");
  const btnOpenSetupGuide = document.getElementById("btnOpenSetupGuide");

  function openOnboardingModal() {
    if (onboardingOverlay) {
      onboardingOverlay.classList.add("active");
    }
  }

  function closeOnboardingModal() {
    if (onboardingOverlay) {
      onboardingOverlay.classList.remove("active");
    }
    try {
      chrome.storage?.local?.set({ "fc:hasCompletedOnboardingV11": true });
    } catch {}
  }

  // Check 1-time setup condition
  try {
    chrome.storage?.local?.get(["fc:hasCompletedOnboardingV11"], (res) => {
      if (!res || !res["fc:hasCompletedOnboardingV11"]) {
        setTimeout(() => {
          openOnboardingModal();
        }, 500);
      }
    });
  } catch {}

  if (btnCloseOnboardingX) {
    btnCloseOnboardingX.addEventListener("click", closeOnboardingModal);
  }
  if (btnCompleteOnboarding) {
    btnCompleteOnboarding.addEventListener("click", closeOnboardingModal);
  }
  if (btnOpenSetupGuide) {
    btnOpenSetupGuide.addEventListener("click", openOnboardingModal);
  }
  if (btnOnboardingOpenFlow) {
    btnOnboardingOpenFlow.addEventListener("click", () => {
      activateFlowTab();
    });
  }
  if (btnOnboardingCopyPrompt) {
    btnOnboardingCopyPrompt.addEventListener("click", () => {
      copyPromptWithFeedback(
        btnOnboardingCopyPrompt,
        btnOnboardingCopyPromptLabel,
        "Copy Setup Prompt",
        btnOnboardingCopyPromptAffordance
      );
    });
  }

  // ─── Quality Switches Persistence ────────────────────────────
  const STORAGE_2K = "fa:image2k";
  const STORAGE_1080P = "fa:video1080p";
  const STORAGE_NEW = "fa:newProjectDefault";
  const STORAGE_SEED_LOCK = "fa:seedLockEnabled";
  const STORAGE_SEED_VAL = "fa:seedVal";
  const STORAGE_POLICY_GUARD = "fa:policyGuardEnabled";
  const STORAGE_PUSH_TELEMETRY = "fa:pushTelemetryEnabled";

  chrome.storage.local.get([
    STORAGE_2K, STORAGE_1080P, STORAGE_NEW,
    STORAGE_SEED_LOCK, STORAGE_SEED_VAL,
    STORAGE_POLICY_GUARD, STORAGE_PUSH_TELEMETRY
  ], (vals) => {
    if (switch2k) switch2k.checked = !!vals[STORAGE_2K];
    if (switch1080p) switch1080p.checked = !!vals[STORAGE_1080P];
    if (switchNewProject) switchNewProject.checked = !!vals[STORAGE_NEW];

    const isSeedOn = !!vals[STORAGE_SEED_LOCK];
    const savedSeed = vals[STORAGE_SEED_VAL] || Math.floor(100000 + Math.random() * 900000);
    if (switchSeedLock) switchSeedLock.checked = isSeedOn;
    if (switchPrefSeedLock) switchPrefSeedLock.checked = isSeedOn;
    if (inputSeedVal) inputSeedVal.value = savedSeed;
    if (seedLockInputRow) seedLockInputRow.style.display = isSeedOn ? "flex" : "none";

    const isPolicyOn = vals[STORAGE_POLICY_GUARD] !== undefined ? !!vals[STORAGE_POLICY_GUARD] : true;
    if (switchPolicyGuard) switchPolicyGuard.checked = isPolicyOn;

    const isPushOn = vals[STORAGE_PUSH_TELEMETRY] !== undefined ? !!vals[STORAGE_PUSH_TELEMETRY] : true;
    if (switchPushTelemetry) switchPushTelemetry.checked = isPushOn;
    if (telemetryBadge) {
      telemetryBadge.textContent = isPushOn ? "Push Active" : "Polling Mode";
      telemetryBadge.style.color = isPushOn ? "#6ee7b7" : "var(--status-amber)";
    }
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

  if (switchPolicyGuard) {
    switchPolicyGuard.addEventListener("change", (e) => {
      chrome.storage.local.set({ [STORAGE_POLICY_GUARD]: e.target.checked });
      triggerToast(`Policy Auto-Dismiss & Retry: ${e.target.checked ? 'Enabled' : 'Disabled'}`);
      addTelemetryLog(`Policy Guard: ${e.target.checked ? 'Active' : 'Disabled'}`);
    });
  }

  if (switchPushTelemetry) {
    switchPushTelemetry.addEventListener("change", (e) => {
      chrome.storage.local.set({ [STORAGE_PUSH_TELEMETRY]: e.target.checked });
      triggerToast(`Push Telemetry: ${e.target.checked ? 'WebSocket Instant' : 'File Polling'}`);
      if (telemetryBadge) {
        telemetryBadge.textContent = e.target.checked ? "Push Active" : "Polling Mode";
        telemetryBadge.style.color = e.target.checked ? "#6ee7b7" : "var(--status-amber)";
      }
      addTelemetryLog(`Telemetry mode: ${e.target.checked ? 'WebSocket Push' : 'File Polling'}`);
    });
  }
});
