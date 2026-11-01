# CoachSub — Field, Lineup & Substitution Manager

**CoachSub** is a mobile-first Progressive Web App (PWA) designed for coaches, managers, and sideline staff to effortlessly track player playing time, position assignments, and staged substitutions across multiple team sports.

Designed specifically for sideline use on phones and tablets in bright sunlight, rainy pitches, or zero-connectivity venues, CoachSub operates 100% offline with zero external cloud dependencies.

---

## Table of Contents
1. [Supported Sports](#supported-sports)
2. [Key Features](#key-features)
3. [Program Usage & Quick Start](#program-usage--quick-start)
   - [Match Clock & Period Management](#1-match-clock--period-management)
   - [Managing the Half-Field View & Horizontal Flip](#2-managing-the-half-field-view--horizontal-flip)
   - [Player Positioning: Drag & Drop vs Quick Tap](#3-player-positioning-drag--drop-vs-quick-tap)
   - [Staging & Executing Substitutions](#4-staging--executing-substitutions)
   - [Substitution Timeline Log](#5-substitution-timeline-log)
   - [Official Match Sheet & Printable PDF Export](#6-official-match-sheet--printable-pdf-export)
   - [Roster & Team Management](#7-roster--team-management)
   - [Backup & Transfer (JSON)](#8-backup--transfer-json)
   - [Settings, Multi-Language & Sport Selection](#9-settings-multi-language--sport-selection)
4. [Mobile Installation (PWA)](#mobile-installation-pwa)
5. [In-App Updates & Forced Update Mechanism](#in-app-updates--forced-update-mechanism)
6. [Local Development](#local-development)
7. [Production Build & Apache Deployment](#production-build--apache-deployment)
   - [Building for Production](#building-for-production)
   - [Apache Configuration & VirtualHost](#apache-configuration--virtualhost)
   - [Enabling Required Apache Modules](#enabling-required-apache-modules)
   - [HTTPS / SSL Requirement](#https--ssl-requirement)

---

## Supported Sports

CoachSub includes authentic half-pitch vector markings, standard period breakdowns, and starter/bench presets for five major team sports:

| Sport | Playing Surface | Standard Preset | Pitch Markings Included |
|---|---|---|---|
| **Soccer** | Grass / Turf Stripes | 11v11 (11 starters, 7 bench) | Penalty area, 6-yard box, penalty arc & spot, corner arc, center circle & spot, goal cage |
| **Ice Hockey** | Rink Ice with crease | 6v6 (6 starters, 6 bench) | Center red line, center faceoff dot & circle, blue zone line, goal crease, goal net |
| **Lacrosse** | Green Field Turf | 10v10 (10 starters, 6 bench) | Center line, wing lines, restraining line, 18-foot goal crease & triangular net cage |
| **Field Hockey** | High-contrast Turf | 11v11 (11 starters, 5 bench) | 23m quarter lines, 16-yard shooting circle ("D"), 5m broken dotted circle, penalty stroke spot, goal cage |
| **Rugby** | Rugby Pitch (Union/League) | 15 starters, 7 bench replacements | In-goal try area, try line, H-shaped uprights & crossbar, 5m dash line, 22m line, 10m dash line, touchline dash marks |

---

## Key Features

- **Split-Screen Ergonomics**: The top 50% is an interactive half-pitch canvas; the bottom 50% is a scrollable bench tray.
- **Horizontal Goal Flip**: Instantly toggle the goal from the left to right side with one tap. All on-field and staged player tokens automatically calculate their mirrored coordinates (`x' = 100 - x`).
- **Individual Game-Time Clocks**: Every player's token displays a live minute:second counter that ticks only when the match clock is running and the player is active on the pitch.
- **Visual Staged Substitutions**: Tap a bench player and drag onto an on-field player (or tap to stage). Staged players hover as mini-tokens connected by a green dashed guideline. You can stage 1, 2, or 5 substitutions simultaneously, and execute them with a single tap of the whistle button.
- **Mobile Hamburger Menu**: On small screens, secondary tools (Timeline, Reset Timers, Roster, Backup/Transfer, PDF Match Sheet, and Update Detector) tuck away into a responsive navigation drawer.
- **Printable PDF Match Report**: Generate an official match report with team name, match date, final match time, starter lineup table with minutes played, and a complete chronological substitution log. Trigger native browser print or download a self-contained HTML report.
- **PWA Update Notification & Force Update**: Automatically detects when a new release is deployed on your web server and notifies the coach with a floating banner and in the menu. One tap triggers `SKIP_WAITING` and reloads into the new version instantly without losing local roster data.
- **Dedicated Settings & Multi-Language Support**: Complete translations for **English (🇺🇸)**, **French (🇫🇷 Français)**, **Spanish (🇪🇸 Español)**, and **Chinese (🇨🇳 中文 简体)**. The Settings page houses language selection, pitch sport selector, goal orientation, and sound effects.
- **Zero-Cloud Offline Persistence**: State is stored in HTML5 `localStorage`. All timers, rosters, positions, and substitution histories survive accidental browser closure or app restarts.

---

## Program Usage & Quick Start

### 1. Match Clock & Period Management
- **Start / Pause**: Tap the large emerald **Play (▶)** button in the header bar. When green/running, the match clock and all on-field player counters advance together. When paused, all counters freeze.
- **Period Dropdown**: Switch between periods (e.g., 1st Half / 2nd Half / Extra Time for Soccer and Rugby; 1st / 2nd / 3rd Period for Hockey; 1st / 2nd / 3rd / 4th Quarter for Lacrosse).
- **Reset Match Clock**: Tap the circular reload button next to the time display to reset only the match clock to `00:00`.
- **Reset All Player Timers**: Accessible via the header or hamburger menu. Requires a double-confirmation modal to prevent accidental data loss.

### 2. Managing the Half-Field View & Horizontal Flip
- Sidelines change sides every period or match. Tap the **Flip (⇄)** button in the top bar to mirror the field.
- If your goal was defending on the left, it flips to the right. Player tokens are mirrored proportionally across the horizontal axis.

### 3. Player Positioning: Drag & Drop vs Quick Tap
CoachSub provides dual interaction models for tablets and small mobile phones:
1. **Touch / Mouse Drag**:
   - Touch and hold any token on the bench or field.
   - Drag to any coordinate on the pitch canvas and release.
   - If dropped over an existing player, CoachSub automatically initiates a **Staged Substitution**.
2. **Quick Tap Modal (Single-Hand Phone Use)**:
   - Tap any active player on the pitch.
   - A modal sheet pops up showing their number, name, and total minutes played.
   - Tap **"Move to Bench"** to withdraw the player, or **"Choose Sub from Bench"** to stage an incoming player.

### 4. Staging & Executing Substitutions
Coaches often plan substitutions minutes before a ball goes out of play or during stoppage:
1. Drag a player from the bench over an on-field player.
2. A highlighted target circle appears with a "Stage Sub" badge.
3. Upon release, the incoming player appears offset at the target's position with a green dashed connector line.
4. An **"Execute Substitutions"** floating action bar appears at the bottom with:
   - The total number of pending substitutions.
   - Individual sub chips (e.g., `#12 In ➔ #7 Out`).
   - A **"Whistle / Execute All"** green button.
   - A **"Cancel All"** button.
5. When the referee signals the stoppage, tap **"Execute Substitutions"**. CoachSub swaps the players, starts the incoming player's timer, moves the outgoing player to the bench, plays an audio whistle confirmation, and logs the transaction.

### 5. Substitution Timeline Log
Tap the **Timeline (clock icon)** button in the header or hamburger menu:
- Displays a visual chronological list of every substitution made during the match.
- Each entry shows:
  - Match clock time (e.g., `34:12`)
  - Match period (e.g., `1st Half`, `2nd Period`)
  - Timestamp (e.g., `14:45`)
  - Outgoing player (#, name, and minutes played before being subbed)
  - Incoming player (#, name)
- Includes a **"Clear History"** option to wipe logs before a new match.

### 6. Official Match Sheet & Printable PDF Export
Tap **"Print / Export PDF"** in the hamburger menu or header:
- Opens a clean, formatted match sheet preview with:
  - Header: Team Name, Selected Sport, Match Date, and Total Match Duration.
  - Active Lineup Table: All on-field starters with jersey number, position, and total minutes played.
  - Bench Reserves Table: All substitute players and their playing times.
  - Complete Substitution Timeline: Table showing each substitution, period, match time, and swapped players.
- **Export Actions**:
  - **"Print / Save as PDF"**: Invokes the browser's native print engine. On iOS and Android, select **"Save as PDF"** or print directly to any network/AirPrint printer.
  - **"Download HTML Report"**: Generates a self-contained `.html` file that can be opened or emailed as an offline digital record.

### 7. Roster & Team Management
Tap the **Roster (Users icon)** button:
- **Set Team Name**: Edit your club or school team name directly at the top of the modal.
- **Add New Player**: Enter jersey number, name, and position (e.g., Forward, Prop, Fly-half, Goalkeeper).
- **Color Picker**: Customize player token colors to distinguish goalkeepers, captains, or defensive units.
- **Load Sport Presets**: Tap the reload button next to "Preset" to load the default roster for Soccer, Hockey, Lacrosse, Field Hockey, or Rugby.

### 8. Backup & Transfer (JSON)
Tap **"Backup / Transfer"** in the menu:
- Export your entire roster, field positions, match clocks, and substitution logs as a single `.json` file.
- Import a previously saved `.json` file on another coach's phone or tablet to synchronize lineups instantly.

### 9. Settings, Multi-Language & Sport Selection
Tap the **Settings (Gear icon)** in the header or hamburger menu:
- **Language Selector**: Instantly switch the user interface between:
  - 🇺🇸 **English**
  - 🇫🇷 **Français** (French)
  - 🇪🇸 **Español** (Spanish)
  - 🇨🇳 **中文 (简体)** (Chinese)
  All match clocks, period names, roster managers, pitch helpers, timelines, and printable official match sheets reflect the chosen language immediately.
- **Sport Switcher (Moved to Settings)**:
  - Select between **Soccer (Football)**, **Ice Hockey**, **Lacrosse**, **Field Hockey**, and **Rugby**.
  - Choose to keep your current player list or load the authentic starter preset for the newly chosen sport.
  - Moving the sport switcher into Settings streamlines the top match header bar for distraction-free game tracking on small phone screens.
- **Goal Side Orientation**: Toggle defending/attacking direction (Goal Left vs Goal Right).
- **Audio Whistle Toggle**: Enable or mute the referee whistle audio confirmation when executing substitutions.
- **App & PWA Info**: View installed app version and offline cache availability.

---

## Mobile Installation (PWA)

CoachSub is configured as a standalone Progressive Web App with its own web app manifest and Service Worker.

### On Apple iOS (iPhone & iPad Safari)
1. Open the app URL in **Safari**.
2. Tap the **Share** button (box with an upward arrow) in the browser toolbar.
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm by tapping **"Add"**. The CoachSub icon will appear on your home screen and run in full-screen standalone mode without browser navigation bars.

### On Google Android (Chrome)
1. Open the app URL in **Chrome**.
2. Tap the **"Install CoachSub"** badge in the top right of the field canvas, or open the Chrome menu (⋮) and select **"Install App"** / **"Add to Home screen"**.
3. Confirm the install prompt.

---

## In-App Updates & Forced Update Mechanism

When you deploy a new build to your web server, installed PWA applications on phones may continue to run the cached version until the service worker refreshes. CoachSub includes an active update detection and forced activation system:

1. **Automatic Detection**:
   - The app periodically polls for service worker updates (`sw.update()`) and checks whenever the app regains focus or comes back online.
   - When a new version is detected, a glowing notification badge appears on the hamburger menu, and a floating **"App Update Ready"** banner displays in the lower right corner.
2. **Forced Update from Menu**:
   - Open the hamburger menu (☰).
   - Look at the **"App Updates"** card:
     - Tap **"Check for Updates"** to manually query the server.
     - When an update is ready, tap the green **"Force Update Now"** button.
   - CoachSub sends a `SKIP_WAITING` message to the Service Worker, activating the new code and performing a clean window reload. All local roster and timer data is preserved.

---

## Local Development

CoachSub is built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

### Prerequisites
- Node.js 18+ or Node 20+
- npm or bun

### Setup
```bash
# Clone or navigate to the project directory
cd /path/to/coachsub

# Install dependencies
npm install

# Start Vite development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Production Build & Apache Deployment

### Building for Production
To generate the production bundle:
```bash
npm run build
```
This builds the optimized assets into the `dist/` directory:
- `dist/index.html`
- `dist/assets/index-[hash].js` and `dist/assets/index-[hash].css`
- `dist/manifest.webmanifest`
- `dist/sw.js` (native service worker)
- `dist/.htaccess` (Apache configuration)

### Apache Configuration & VirtualHost
To serve CoachSub from `/var/www/coachsub` on an Apache server (e.g., Ubuntu/Debian `pitchmaster`):

1. **Copy the build output**:
   ```bash
   sudo mkdir -p /var/www/coachsub
   sudo cp -r dist/* /var/www/coachsub/
   sudo chown -R www-data:www-data /var/www/coachsub
   sudo chmod -R 755 /var/www/coachsub
   ```

2. **Verify `/var/www/coachsub/.htaccess`**:
   The `public/.htaccess` file is copied to `dist/.htaccess` automatically during build. It ensures:
   - Single Page App client-side routing fallback to `index.html`.
   - MIME types for `.webmanifest` (`application/manifest+json`) and `.svg`.
   - Cache headers preventing caching of `sw.js` and `index.html` so updates are immediately detected.
   - Long-term caching for hashed static assets (`.js`, `.css`, images).

3. **Apache VirtualHost Example**:
   Create or edit `/etc/apache2/sites-available/coachsub.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName coachsub.yourdomain.com
       DocumentRoot /var/www/coachsub

       <Directory /var/www/coachsub>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/coachsub_error.log
       CustomLog ${APACHE_LOG_DIR}/coachsub_access.log combined
   </VirtualHost>
   ```

### Enabling Required Apache Modules
Ensure `mod_rewrite`, `mod_headers`, and `mod_mime` are enabled:
```bash
sudo a2enmod rewrite headers mime
sudo a2ensite coachsub.conf
sudo systemctl restart apache2
```

### HTTPS / SSL Requirement
> **Important**: Modern browsers **require HTTPS** to enable Service Workers and PWA installation (with the sole exception of `localhost`).
> To install CoachSub on iOS or Android devices from your Apache server, configure a free Let's Encrypt SSL certificate:
> ```bash
> sudo apt-get install certbot python3-certbot-apache
> sudo certbot --apache -d coachsub.yourdomain.com
> ```
