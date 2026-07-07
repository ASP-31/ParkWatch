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

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js / Next.js |
| Styling | Tailwind CSS |
| Backend | Supabase / Firebase |
| Database | PostgreSQL (Supabase) / Cloud Firestore |
| Storage | Supabase Storage / Firebase Storage |
| Authentication | Supabase Auth / Firebase Authentication |

---

# 📂 Project Structure

```text
ParkWatch/
├── public/
│   ├── icons/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── CameraCapture.jsx      # Camera capture component
│   │   ├── ReportForm.jsx         # Report submission form
│   │   └── ViolationFeed.jsx      # Community dashboard
│   │
│   ├── config/
│   │   └── backend.js             # Firebase/Supabase configuration
│   │
│   ├── App.jsx
│   └── index.css
│
├── .env.local
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- npm or Yarn

---

## 2. Clone the Repository

```bash
git clone https://github.com/yourusername/parkwatch-mvp.git

cd parkwatch-mvp
```

---

## 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

---

## 4. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
# Backend
NEXT_PUBLIC_BACKEND_URL=your_backend_url

# Storage
NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

---

## 5. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

# 📱 Mobile Testing

To test the camera functionality on your smartphone:

1. Connect your laptop and phone to the same Wi-Fi network.
2. Find your computer's local IP address.
3. Open:

```
http://<your-local-ip>:3000
```

Example:

```
http://192.168.1.15:3000
```

---

# 📖 How It Works

1. Open ParkWatch.
2. Capture a photo of the obstructing vehicle.
3. Enter the vehicle's license plate number.
4. Add a short location description.
5. Submit the report.
6. The report instantly appears on the community dashboard.

---

# 🎯 MVP Goals

- Fast reporting process
- Community-driven reporting
- Mobile-first experience
- Public transparency
- Simple and intuitive UI

---

# 🔮 Future Roadmap

## 🚘 Automatic License Plate Recognition (ALPR)

- OCR-powered number plate detection
- Automatically fills the vehicle number

## 📍 GPS Geotagging

- Automatically capture device location
- Display reports on an interactive map

## 🔔 Anonymous Vehicle Alerts

- Notify vehicle owners through:
  - WhatsApp
  - SMS
  - Email

## 🗺 Interactive Map

- Live map showing reported parking violations.

## 👍 Community Verification

- Allow users to confirm reports.
- Reduce spam and false reports.

## 🚨 Admin Dashboard

- Report moderation
- Spam removal
- Analytics

## 🔍 Search & Filters

- Search by vehicle number
- Filter by location
- Filter by date

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub. Your support helps improve and grow the project.

---
Made with ❤️ to help build safer, obstruction-free streets through community participation.
