const d=["https://flow.google.com/*","https://labs.google/*"],n="https://flow.google.com",c=/(?:\/fx\/tools\/flow)?\/project\/([^/?#]+)/;function h(e){try{const o=new URL(e);return o.host==="flow.google.com"?!0:o.host==="labs.google"&&o.pathname.includes("/fx/tools/flow")}catch{return!1}}function m(e){return/(?:\/fx\/tools\/flow)?\/project\/[^/]+\/(?:edit|scene)\/[^/?#]+/.test(e)}function a(e){return/^https?:\/\/[^/]+(\/u\/\d+)(?:\/|$)/.exec(e??"")?.[1]??""}function r(e){return`${n}${a(e)}`}function f(e,o){return`${r(o)}/project/${e}`}function u(e){return/\/asb\/([\w-]+)/.exec(e)?.[1]}function w(e){return/flow-content\.google\/(?:image|video)\/([^?/]+)/.exec(e)?.[1]}function g(e){const o=new URL(e);return o.pathname.includes("=")||(o.pathname+="=mm,22,15"),o.href}const t="https://flow-connector.flowconnector.workers.dev",p=`${t}/#pricing`,y=`${t}/privacy`,k=`${t}/contact`,b="mirza@flowconnector.dev",I="https://chrome.google.com/webstore",v=`${t}/terms`,T=`${t}/health`,l="flow-connector-cli",i="https://github.com/mirza-ahmed-hassan/flow-connector",S=`${i}/issues`,E=`${i}/issues/new`,N=[],s="flow-auto-mcp",O=`Set up Flow Connector on my machine so you can generate images and videos through my own logged-in Google Flow session (no API cost).

This is safe to run even if it's already set up — check each step first and skip
anything already done. Never force or reinstall something that's already working.

If your shell commands run inside a sandbox (Codex does this by default), run
EVERY command in this setup outside it, asking me for approval — from the first
command, not after one fails. They need my global npm folder, the network and a
local port, and a sandbox hides all three: inside one, "flow-auto is not
recognized", "Cannot find module", "Access is denied" and network errors are
the sandbox talking, not a missing or broken install.

1. Is the CLI already installed? Run:
     flow-auto --version
   - If it prints a version, it's installed — SKIP to step 5.
   - If the command is not found, carry on with step 2.

2. Work out which machine this is, once, and use only that section from here on.
   Do not run another OS's commands to "see if they work" — a wrong package
   manager can install something I did not ask for.

     WINDOWS   PowerShell / cmd, paths like C:\\Users\\...
     macOS     uname -s prints Darwin
     LINUX     uname -s prints Linux

3. Node.js 20 or newer. Run:
     node --version

   - v20 or higher -> go to step 4.
   - anything else -> INSTALL IT NOW, using my section below. Do not ask me
     first. Pasting this prompt is me asking you to set the tool up, and Node
     is not an optional extra — nothing here works without it. Just run the
     command, tell me what you are doing in one line, and carry on.

   Two things you must still stop for, because you physically cannot get past
   them: a password prompt (that is the operating system asking, not you), and
   a graphical installer that has to be clicked. Say which one it is and wait.

   ---- WINDOWS ----
       winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
   If winget is not present, download the LTS MSI from https://nodejs.org and
   run it, telling me the installer window needs my click.
   Then CLOSE this terminal and open a new one. Windows does not refresh the
   PATH of a terminal that was already running, so npm keeps looking missing
   until you do. Do this before step 4, not after it fails.

   ---- macOS ----
   If Homebrew is present (\`brew --version\` works):
       brew install node
   If it is NOT present, do not install Homebrew to get around this — that is
   a far larger change to my machine than installing Node. Use the official
   package instead. Do NOT guess the filename; read the current one first,
   because it changes with every release:
       curl -fsSL https://nodejs.org/dist/index.json
       # pick the newest entry whose "lts" is not false, note its "version"
       # (e.g. v22.11.0), then, with ARCH = arm64 on Apple Silicon, x64 on Intel:
       curl -fsSL -o /tmp/node-lts.pkg https://nodejs.org/dist/<version>/node-<version>.pkg
       sudo installer -pkg /tmp/node-lts.pkg -target /
   The \`sudo\` will ask for my password — tell me it is coming and wait.
   Then open a new terminal tab.

   ---- LINUX ----
   If nvm is already installed (\`nvm --version\` works), use it — it needs no
   root at all:
       nvm install --lts
   Otherwise use my distribution's package manager. \`sudo\` will ask for my
   password; tell me and wait for it:
       sudo apt install -y nodejs npm      (Debian/Ubuntu)
       sudo dnf install -y nodejs          (Fedora/RHEL)
       sudo pacman -S --noconfirm nodejs npm   (Arch)
   Then CHECK what it actually gave you with \`node --version\`. Several
   distributions still package Node 18, which installs quietly and then fails
   much later for a reason that looks unrelated. If it is below 20, send me to
   https://nodejs.org/en/download for the official binaries or the NodeSource
   repository, and stop there.

   Do NOT pipe an installer script from the internet into a shell to get a
   version manager. If nvm is the right answer for my machine, say so and let
   me install it myself.
   Then open a new shell, or source my profile, before continuing.

4. Install the CLI globally (it also provides the local bridge daemon and the
   MCP server):
     npm install -g ${l}

   Known failures, none of which should be retried blindly:
   - EEXIST / "file already exists" -> the command is already there. Treat it
     as installed and move on. Do NOT use --force.
   - "npm is not recognized" right after installing Node -> the terminal is
     older than the install. Tell me to open a new one, then wait.
   - EACCES / EPERM / "permission denied":
       WINDOWS  tell me to reopen the terminal as Administrator once, re-run.
       macOS / LINUX  do NOT re-run this with sudo. It leaves root-owned files
                that break the NEXT install and are awkward to clean up. Tell
                me to move Node to a version manager (nvm, fnm) instead, which
                puts global installs inside my home directory where they need
                no root at all.

5. Connect it to yourself, whichever kind of agent you are.

   Use my USER-LEVEL config, not this project's. This should work from every
   project on my machine, so write to the one in my home directory (e.g.
   ~/.cursor/mcp.json, ~/.codex/config.toml, ~/.gemini/settings.json,
   ~/.codeium/windsurf/mcp_config.json) — NOT a .mcp.json or .cursor/ folder
   inside the current repo. If your config command has a global/user flag, use it.

   - If you support Claude-style skills (Claude Code), run:
       flow-auto skill install flow-generate
     It installs to ~/.claude/skills/, which every project sees. Safe to re-run;
     it skips when already current.

   - Otherwise, register the MCP server in your own user-level config. It is a
     standard stdio MCP server, launched by running \`${s}\`. Most agents
     take it as:
       { "mcpServers": { "flow-connector": { "command": "${s}" } } }
     Some have a command for this instead (\`codex mcp add\`, \`gemini mcp add\`,
     and similar) — use it if you have one. MERGE this in without overwriting
     anything already there, and tell me if you need to be restarted.

6. Check the connection:
     flow-auto status --site flow
   - "extension (flow): connected" and "flow tab: visible" -> say so OUT LOUD right
     away, as your own next message, in this exact spirit — don't wait for me to ask:
       "Connected! I can generate images and videos on Google Flow now — just ask."
     Do this only the first time a session confirms connected; don't repeat it
     on every later status check.
   - "flow tab: HIDDEN" -> tell me to bring the Flow window to the front.
   - "flow access: BLOCKED" -> my browser is blocking the extension on Flow
     (common in Edge). Tell me the three steps it printed, one per line, and
     wait for me to confirm before checking again.
   - "NOT CONNECTED" -> see below.

Once done, this works from ANY project: the CLI is global and the connection is
configured once, so future sessions just use it — no need to run this again.

IMPORTANT — how this tool works, and what to tell me if it is not working:

The extension drives the real Google Flow interface (${n}) in my browser.
A Flow tab must be OPEN, LOGGED IN, and VISIBLE while generating. Browsers
throttle tabs that are minimised or covered, and generation stalls. The browser
side-by-side with your editor, or on a second monitor, is what works.

So whenever a command reports NOT CONNECTED, times out, or stalls, do not retry
silently and do not look for another install source. Stop and tell me to:
  - open ${n} and log in,
  - keep that window visible (not minimised, not behind another window),
  - confirm the Flow Connector extension is enabled,
then wait for me to confirm before re-running the check.

If a command reports the free plan's daily limit is reached, STOP — do not retry
and do not work around it. Tell me the limit reset time and the upgrade link it
printed.

Install Node.js and the npm package without asking me first — that is what
pasting this was. But install NOTHING ELSE: no other packages, no version
managers, no build tools, no scripts piped from the internet. If something
looks like it needs one, stop and tell me instead of deciding for me.

If a step fails, stop and tell me in plain words what went wrong and what I
need to do — show the raw error underneath that, not instead of it.

When it all works, say so in one line and start using it. Do not read the
whole setup back to me.`;export{k as C,I as E,d as F,T as H,S as I,s as M,l as N,c as P,i as R,O as S,v as T,p as U,t as W,n as a,a as b,u as c,g as d,m as e,r as f,b as g,y as h,h as i,E as j,N as k,w as m,f as p};
