# 🚗 ParkWatch (MVP)

A lightweight, crowd-sourced web application designed to help communities report illegal street parking and road obstructions. Users can quickly capture a photo of a vehicle blocking traffic, enter its license plate number, and submit a report to a public community dashboard.

---

## ✨ Planned Features

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

## 🛠 Tech Stack (Planned)

| Layer | Technology |
|--------|------------|
| Frontend | React.js / Next.js |
| Styling | Tailwind CSS |
| Backend | Supabase **or** Firebase (choose one) |
| Database | PostgreSQL (Supabase) / Cloud Firestore (Firebase) |
| Storage | Supabase Storage / Firebase Storage |
| Authentication | Supabase Auth / Firebase Authentication |

---

## 📂 Planned Project Structure

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
│   ├── config/
│   │   └── backend.js             # Firebase/Supabase configuration
│   ├── App.jsx
│   └── index.css
├── .env.local
├── package.json
└── README.md
```

---

## 🚀 Getting Started (After Initialization)

### 1. Prerequisites
- Node.js (v18 or later)
- npm or Yarn

### 2. Initialize the Project
```bash
# Choose one:
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
# OR
npm init -y && npm install next react react-dom && npm install -D typescript @types/react @types/node tailwindcss
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the project root. **Pick one backend:**

**Supabase:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_STORAGE_BUCKET=your_supabase_bucket
```

**Firebase:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_bucket
```

### 5. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:3000`

---

## 📱 Mobile Testing
- Run dev server, access via `http://<local-ip>:3000` from phone on same Wi-Fi
- Camera API requires HTTPS or localhost — works on local LAN IP in dev

---

## 📖 How It Works (Planned Flow)
1. Open ParkWatch.
2. Capture a photo of the obstructing vehicle.
3. Enter the vehicle's license plate number.
4. Add a short location description.
5. Submit the report.
6. The report instantly appears on the community dashboard.

---

## 🎯 MVP Goals
- Fast reporting process
- Community-driven reporting
- Mobile-first experience
- Public transparency
- Simple and intuitive UI

---

## 🔮 Future Roadmap (Post-MVP)
- **ALPR (OCR)**: Automatic license plate recognition
- **GPS Geotagging**: Auto-capture location, interactive map
- **Anonymous Alerts**: Notify owners via WhatsApp/SMS/Email
- **Community Verification**: Users confirm reports, reduce spam
- **Admin Dashboard**: Moderation, analytics
- **Search & Filters**: By vehicle, location, date

---

## 🤝 Contributing
Contributions welcome once the project is initialized!
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push branch: `git push origin feature/new-feature`
5. Open a Pull Request

---

## 📜 License
This project is licensed under the MIT License.

---

Made with ❤️ to help build safer, obstruction-free streets through community participation.