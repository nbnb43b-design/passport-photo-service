# 📸 Passport Photo Service

A full-stack web application for creating professional passport photos with mobile support.

## ✨ Features

- 📱 Mobile camera & image upload
- 🎨 Auto background removal (white/blue/custom)
- ✂️ Basic editing: crop, resize, rotate, brightness, contrast
- 👔 AI clothes change (formal, suit, casual, traditional)
- 📏 Multiple photo sizes (passport, 2×2, 4×6, custom)
- 📄 Auto arrange copies on A4 page
- 🖨️ High-quality print-ready PDF (300 DPI)
- 👁️ Print preview & download

## 🛠️ Tech Stack

### Frontend
- React 18+
- Tailwind CSS
- Axios for API calls
- Vite for bundling

### Backend
- Node.js + Express
- Sharp for image processing
- PDFKit for PDF generation
- Multer for file uploads
- Remove.bg API for background removal

## 📋 Project Structure

```
passport-photo-service/
├── frontend/                 # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Upload.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Clothes.jsx
│   │   │   ├── Size.jsx
│   │   │   └── Print.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express
│   ├── controllers/
│   │   ├── photoController.js
│   │   └── printController.js
│   ├── routes/
│   │   ├── photoRoutes.js
│   │   └── printRoutes.js
│   ├── middleware/
│   │   └── upload.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Quick Start (Local)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## 🌐 API Endpoints

### Photo Operations
- `POST /api/photos/upload` - Upload photo
- `POST /api/photos/remove-bg` - Remove background
- `POST /api/photos/edit` - Edit photo (crop, rotate, brightness, contrast)
- `POST /api/photos/change-clothes` - Change clothes style

### Print Operations
- `POST /api/print/arrange` - Arrange photos on A4
- `POST /api/print/generate-pdf` - Generate print-ready PDF

## 📱 Step Flow

1. **Upload** → Take/upload photo
2. **Edit** → Crop, rotate, adjust brightness/contrast
3. **Clothes** → Select outfit style
4. **Size** → Choose photo size & quantity
5. **Print** → Generate & download PDF

## 🎨 UI Features

- Responsive mobile design
- Step indicator with progress
- Real-time image preview
- Smooth transitions
- Touch-friendly controls
- Gradient modern design

## 📦 Environment Variables

Create `.env` in backend folder:

```
PORT=5000
NODE_ENV=development
REMOVE_BG_API_KEY=your_api_key_here
UPLOAD_DIR=./uploads
```

Get free API key from: https://remove.bg/api

## 📄 Photo Sizes

- **Passport**: 35mm × 45mm
- **2×2 inch**: 50mm × 50mm
- **4×6 inch**: 101mm × 152mm
- **Custom**: User defined

## 🖨️ PDF Features

- Auto-arrange photos on A4 page
- 300 DPI print quality
- High-quality JPEG output
- Metadata included

## 🔧 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "sharp": "^0.32.0",
  "pdfkit": "^0.13.0",
  "axios": "^1.6.0",
  "dotenv": "^16.3.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.3.0"
}
```

## 🚢 Deployment

### Backend (Railway/Heroku)
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

### Frontend (Vercel)
1. Import repo
2. Select `frontend` directory
3. Deploy automatically

## 📝 Notes

- AI clothes change requires external service integration
- Background removal needs remove.bg API key
- PDF generation is server-side for best quality
- Mobile responsive with Tailwind CSS
- No database required (stateless)

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 👨‍💻 Author

Created for passport photo service requirements

---

**Ready to use! Upload photos, edit, and download print-ready PDFs!** 🎉
