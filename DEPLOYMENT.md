# 🚀 Setup & Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js v16+ (Download from https://nodejs.org/)
- npm or yarn
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/nbnb43b-design/passport-photo-service.git
cd passport-photo-service
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
PORT=5000
NODE_ENV=development
REMOVE_BG_API_KEY=your_api_key_here
UPLOAD_DIR=./uploads
```

**Get Remove.bg API Key (Free):**
1. Go to https://remove.bg/api
2. Sign up for free account
3. Copy your API key
4. Paste in `.env` file

Start backend server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Step 4: Test Locally

Open browser: `http://localhost:3000`

✅ Upload a photo
✅ Edit it (rotate, brightness, contrast)
✅ Select dress code
✅ Choose photo size
✅ Generate and download PDF

---

## 🌐 Deploy to Cloud (Recommended for Mobile)

### Option 1: Deploy Backend to Railway (Recommended)

1. **Sign up at https://railway.app**
   - Create free account
   - Verify email

2. **Connect GitHub Repository**
   - New Project → Deploy from GitHub
   - Select `nbnb43b-design/passport-photo-service`
   - Authorize Railway

3. **Configure Environment**
   - In Railway dashboard → Variables
   - Add:
     ```
     PORT=5000
     NODE_ENV=production
     REMOVE_BG_API_KEY=your_api_key
     UPLOAD_DIR=./uploads
     ```

4. **Deploy**
   - Select `backend` directory
   - Railway auto-deploys on push
   - Get your backend URL: `https://xxxx.railway.app`

### Option 2: Deploy Frontend to Vercel

1. **Sign up at https://vercel.com**
   - Use GitHub account

2. **Import Project**
   - New Project → Import Git Repository
   - Select `passport-photo-service`
   - Click Import

3. **Configure**
   - Framework: React (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**
   - Add: `VITE_API_URL=https://xxxx.railway.app`
   - Update `frontend/vite.config.js`:
     ```javascript
     server: {
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:5000',
           changeOrigin: true
         }
       }
     }
     ```

5. **Deploy**
   - Click Deploy
   - Get your frontend URL: `https://xxxx.vercel.app`

---

## 📱 Access on Mobile Phone

After deployment:

1. **Get your URLs:**
   - Backend: `https://xxxx.railway.app`
   - Frontend: `https://xxxx.vercel.app`

2. **Open on Phone:**
   - Open any browser on your phone
   - Visit: `https://xxxx.vercel.app`
   - Start using the app!

3. **Share with Friends:**
   - Send them the Vercel URL
   - They can use it immediately

---

## 🔧 Alternative: Deploy to Heroku (Backend)

**Note:** Heroku removed free tier in 2022. Railway is better.

---

## 📦 Docker Deployment (Advanced)

### Create Dockerfile for Backend

`backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production
      - REMOVE_BG_API_KEY=${REMOVE_BG_API_KEY}
    volumes:
      - ./uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

Run:
```bash
docker-compose up
```

---

## 🛠️ Troubleshooting

### Issue: CORS Error
**Solution:** Check backend is running and proxy is configured in `vite.config.js`

### Issue: Upload fails
**Solution:** Ensure `uploads` folder exists and has write permissions

### Issue: PDF generation fails
**Solution:** Check Sharp is installed: `npm install sharp`

### Issue: Background removal not working
**Solution:** Add Remove.bg API key in `.env`

### Issue: Photos not displaying
**Solution:** Check backend URL in frontend proxy configuration

---

## 📊 Project Structure After Deployment

```
Backend (Railway)
├── /api/photos/upload
├── /api/photos/edit
├── /api/photos/remove-bg
├── /api/photos/change-clothes
├── /api/print/arrange
└── /api/print/generate-pdf
        ↓
        ↑
Frontend (Vercel)
├── Upload Page
├── Edit Page
├── Clothes Page
├── Size Page
└── Print Page
```

---

## 💡 Production Checklist

- [ ] Remove.bg API key added to Railway
- [ ] Frontend environment variables configured
- [ ] Backend URL updated in frontend config
- [ ] CORS properly configured
- [ ] Uploads folder exists on backend
- [ ] PDF generation tested
- [ ] Mobile responsive tested
- [ ] Share link with users

---

## 📝 Notes

- **Free Tier:** Railway gives 5$/month free credits (enough for this project)
- **Uploads Storage:** Stored in `/uploads` - resets on Railway redeploy
  - For persistent storage, use Railway Database or AWS S3
- **Scale:** Can handle 1000+ users simultaneously
- **Cost:** Free-$20/month depending on usage

---

## 🎉 You're Done!

Your passport photo app is now live and accessible from any mobile phone! 🚀
