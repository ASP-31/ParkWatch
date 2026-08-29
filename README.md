# 🚗 ParkWatch (MVP)

A lightweight, crowd-sourced web application designed to help communities report illegal street parking and road obstructions. Users can quickly capture a photo of a vehicle blocking traffic, enter its license plate number, and submit a report to a public community dashboard.

---

## ✨ Features

### 📸 One-Tap Camera Capture
- Opens the device's rear camera on supported mobile browsers.
- Allows users to instantly capture a photo of an illegally parked vehicle.

### ⚡ Frictionless Reporting
- Submit a report in under 10 seconds.
- Minimal input fields:
  - Vehicle Number
  - Location Description
  - Photo

### 📰 Live Community Feed
- Public dashboard displaying reported parking violations in chronological order.
- Keeps the community informed of active obstructions.

### 📱 Mobile-First UI
- Responsive interface optimized for smartphones.
- Fast, lightweight, and easy to use while on the move.

---

## 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Supabase |
| Database | PostgreSQL (Supabase) |
| Storage | Supabase Storage |
| Auth | Supabase Auth (anonymous) |

---

## 📂 Project Structure

```text
ParkWatch/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   │   ├── CameraCapture.jsx      # Camera capture component
│   │   ├── ReportForm.jsx         # Report submission form
│   │   └── ViolationFeed.jsx      # Community dashboard
│   ├── app/
│   │   ├── page.tsx               # Home page (App Router)
│   │   └── layout.tsx             # Root layout
│   ├── config/
│   │   └── supabase.js            # Supabase client configuration
│   ├── App.jsx
│   └── index.css                  # Tailwind directives
│
├── .env.local                       # local dev env (gitignored)
├── .env.example                     # template (commit this)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── next-env.d.ts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or later)
- npm or Yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000`

**Network access** (test on phone same Wi-Fi):
```
http://<your-local-ip>:3000
```

### 4. Environment Variables
Your `.env.local` already contains the Supabase config. Verify:

```env
NEXT_PUBLIC_SUPABASE_URL=https://atnpdrgbofkmracfsybe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_G8nhCJiBAnnBRfVse6u1oA_ZLQTgtU0
NEXT_PUBLIC_STORAGE_BUCKET=violations
```

The `SUPABASE_SECRET_KEY` is **not** needed for the client — only use it in server API routes if required.

### 5. Mobile Testing
- Connect laptop and phone to the same Wi-Fi
- Access via `http://<local-ip>:3000`
- Camera API works on local LAN IP in dev

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Made with ❤️ to help build safer, obstruction-free streets through community participation.