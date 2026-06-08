# 🏆 World Cup Pool 2026 — v2 (Live Sync)

Real-time 4-player World Cup pool with pre-loaded match schedule.
All 104 matches are pre-loaded — just tap the winning team after each game.
All 4 players see updates instantly via Supabase real-time sync.

---

## Setup (Two Parts)

### Part 1 — Supabase (Free Database)

1. Go to **supabase.com** and create a free account
2. Click **"New Project"** — name it anything (e.g. `wc2026-pool`)
3. Choose a region close to you, set a database password, click **Create**
4. Wait ~2 minutes for it to set up
5. Go to **SQL Editor** → **New Query**
6. Paste the contents of `supabase_setup.sql` and click **Run**
7. Go to **Settings → API** and copy:
   - **Project URL** (looks like `https://abcxyz.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Part 2 — Connect to Your App

1. In your project folder, copy `.env.example` to a new file called `.env`
2. Open `.env` and paste your values:
   ```
   VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Save the file

---

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploying to GitHub Pages

1. Edit `vite.config.js` — update `base` to your repo name:
   ```js
   base: '/YOUR_REPO_NAME/',
   ```

2. Add your Supabase keys to GitHub Secrets so they're available during deploy:
   - Go to your GitHub repo → **Settings → Secrets and variables → Actions**
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

   **OR** (simpler): just build locally and deploy:
   ```bash
   npm run deploy
   ```
   *(The `.env` file is used locally for building — it never gets committed to GitHub)*

3. Enable GitHub Pages: repo → **Settings → Pages → Branch: gh-pages → Save**

---

## How to Use

1. Open the app and enter 4 player names → **Start Draft**
2. Complete the 12-round draft
3. Share the URL with all 4 players — they'll see the same pool live
4. After each World Cup match, open the **⚽ Matches** tab
5. Find the match (sorted by group/round), tap the **winning team**
6. All 4 players instantly see the standings update

---

## Features

| Feature | Description |
|---|---|
| 📋 Draft | 12 rounds, rotating order, all 48 teams by FIFA rank |
| ⚽ All 104 matches | Pre-loaded with dates, times, and cities (ET) |
| 👆 One-tap results | Tap winner to eliminate loser instantly |
| 🔄 Real-time sync | All players see updates instantly (Supabase) |
| 💾 Offline fallback | Works without Supabase — saves locally |
| ↩ Undo | Undo any match result if entered incorrectly |
| 🏆 Auto-winner | Declares pool winner when Final is entered |

---

## Tech Stack
- React 18 + Vite
- Supabase (PostgreSQL + real-time)
- gh-pages for hosting
