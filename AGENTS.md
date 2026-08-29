# ParkWatch — Agent Instructions

## Project Status
**Pre-code**: Only README + LICENSE exist. No package.json, src/, or config files yet.

## Tech Stack (from README)
- **Frontend**: React.js / Next.js
- **Styling**: Tailwind CSS
- **Backend**: Supabase or Firebase (both documented, pick one)
- **Database**: PostgreSQL (Supabase) / Cloud Firestore (Firebase)
- **Storage**: Supabase Storage / Firebase Storage
- **Auth**: Supabase Auth / Firebase Authentication

## Planned Structure
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
│   ├── config/
│   │   └── backend.js        # Firebase/Supabase config
│   ├── App.jsx
│   └── index.css
├── .env.local
├── package.json
└── README.md
```

## Setup Commands (once initialized)
```bash
npm install          # or yarn install
npm run dev          # starts dev server on localhost:3000
```

## Required Environment Variables (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

## Mobile Testing
- Run dev server, access via `http://<local-ip>:3000` from phone on same Wi-Fi
- Camera API requires HTTPS or localhost — works on local LAN IP in dev

## Key Architectural Notes
- **Mobile-first**: Camera capture uses `getUserMedia()` (rear camera preferred)
- **Backend choice not finalized**: README documents both Supabase and Firebase — decide before implementing
- **Auth**: Anonymous or simple auth for reporting; no user accounts in MVP
- **Storage**: Photos uploaded to Supabase Storage or Firebase Storage
- **Feed**: Real-time subscription to violations table/collection

## MVP Scope (from README)
- One-tap camera capture
- Vehicle number + location + photo form
- Live chronological feed
- <10 second report flow

## Future Roadmap (not in scope yet)
- ALPR (OCR), GPS geotagging, anonymous alerts, map view, community verification, admin dashboard, search/filters