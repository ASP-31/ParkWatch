# ParkWatch — Agent Instructions

## Project Status
**Initialized**: Next.js 14 + Supabase project is set up and running.

## Tech Stack (confirmed)
- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + Realtime + Storage + Auth)
- **Database**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage (bucket: `violations`)
- **Auth**: Supabase Auth (anonymous, client-side)
- **Client SDK**: `@supabase/supabase-js`

## Running the Project
```bash
npm install         # install deps (run once)
npm run dev         # starts Turbopack dev server on http://localhost:3000
```

### Mobile Testing
- Connect laptop + phone to same Wi-Fi
- Access: `http://<local-ip>:3000`
- Camera `getUserMedia()` works on local LAN IP in dev

### Env vars verified in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://atnpdrgbofkmracfsybe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_G8nhCJiBAnnBRfVse6u1oA_ZLQTgtU0
NEXT_PUBLIC_STORAGE_BUCKET=violations
```

## Project Structure
```
ParkWatch/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   │   ├── CameraCapture.jsx
│   │   ├── ReportForm.jsx
│   │   └── ViolationFeed.jsx
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   └── layout.tsx     # Root layout
│   ├── config/
│   │   └── supabase.js    # Supabase client config
│   ├── App.jsx
│   └── index.css          # Tailwind @directives
├── .env.local             # your secrets (gitignored)
├── .env.example           # template — commit this
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## Key Architectural Notes
- **App Router**: Next.js `app/` directory with `page.tsx`
- **Supabase client**: Initialized in `src/config/supabase.js` — use `supabase.from('violations')` for queries
- **Storage**: Photos uploaded to Supabase Storage bucket `violations` (create this bucket in the dashboard)
- **Auth**: Anonymous — `supabase.auth.signInAnonymously()`; no user accounts in MVP
- **Real-time**: Subscribe to `violations` table changes for live feed
- **Tailwind**: `src/index.css` includes `@tailwind base; @tailwind components; @tailwind utilities;`
- **TypeScript**: Enabled via `tsconfig.json`; `.tsx` files in `src/`

## MVP Scope (from README)
- One-tap camera capture via `getUserMedia()`
- Vehicle number + location + photo form
- Live chronological feed (real-time supabase subscription)
- <10 second report flow

## Future Roadmap (post-MVP)
- ALPR (OCR) for auto-filling vehicle number
- GPS geotagging + interactive map
- Anonymous vehicle alerts (WhatsApp/SMS/Email)
- Community verification / spam reduction
- Admin dashboard / moderation
- Search & filters (by vehicle, location, date)

## Commands
| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Start production | `npm run start` |
| Lint | `npm run lint` (if configured) |

## Git Ignored
`.env.local`, `node_modules/`, `.next/`, `out/`