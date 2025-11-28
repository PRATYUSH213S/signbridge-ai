# SignBridge-AI - Complete Deployment Guide 🚀

## 1. Tech Stack Summary

### Frontend
- **Framework**: React 19.1.0 (Create React App)
- **Routing**: React Router DOM 7.5.0
- **HTTP Client**: Axios 1.8.4
- **ML/AI Libraries**:
  - TensorFlow.js 4.22.0 (hand pose detection)
  - MediaPipe Hands 0.4.1675469240
  - Fingerpose 0.1.0 (gesture recognition)
- **3D Graphics**: Three.js 0.175.0
- **UI Libraries**: React Bootstrap 2.10.9
- **Media**: React Webcam 7.2.0, React Media Recorder 1.7.1
- **Build Tool**: React Scripts 5.0.1

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB (via Mongoose 8.13.2)
- **Authentication**: Bcryptjs 3.0.2 (password hashing)
- **CORS**: CORS 2.8.5

### Database
- **Type**: MongoDB
- **Connection**: Mongoose ODM
- **Default Database**: `sign-language_learn`

### Configuration Files
- `frontend/package.json` - Frontend dependencies
- `backend/package.json` - Backend dependencies
- No `.env` files found (hardcoded values present)

---

## 2. Dependencies & Environment Requirements

### System Requirements
- **Node.js**: v16+ (recommended: v18 or v20 LTS)
- **npm**: v8+ (comes with Node.js)
- **MongoDB**: v5.0+ (local or cloud instance)
- **Git**: For version control

### Frontend Dependencies (Key)
```
React 19.1.0
React Router DOM 7.5.0
Axios 1.8.4
TensorFlow.js 4.22.0
MediaPipe Hands 0.4.1675469240
Three.js 0.175.0
```

### Backend Dependencies (Key)
```
Express 5.1.0
Mongoose 8.13.2
Bcryptjs 3.0.2
CORS 2.8.5
```

### Environment Variables Needed
**Backend:**
- `PORT` (default: 5000)
- `MONGODB_URI` (currently hardcoded: `mongodb://127.0.0.1:27017/sign-language_learn`)
- `NODE_ENV` (development/production)

**Frontend:**
- `REACT_APP_API_URL` (currently hardcoded: `http://localhost:5000`)

---

## 3. Step-by-Step Deployment Guide

### 🏠 LOCAL SETUP INSTRUCTIONS

#### Step 1: Prerequisites Install Karo
```bash
# Node.js install karo (agar nahi hai toh)
# Download from: https://nodejs.org/

# MongoDB install karo (agar local use karna hai)
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Verify installation
node --version
npm --version
mongod --version
```

#### Step 2: Project Clone/Download Karo
```bash
# Agar Git se clone kar rahe ho
git clone <your-repo-url>
cd SignBridge-AI

# Ya phir directly folder open karo
```

#### Step 3: Backend Setup
```bash
# Backend folder mein jao
cd backend

# Dependencies install karo
npm install

# MongoDB start karo (agar local hai)
# Windows: mongod (separate terminal mein)
# Mac/Linux: sudo systemctl start mongod

# Server start karo
npm start
# Ya phir: node index.js

# Server port 5000 pe chalega
# Check karo: http://localhost:5000
```

#### Step 4: Frontend Setup
```bash
# Root se frontend folder mein jao
cd frontend

# Dependencies install karo (ye thoda time lega)
npm install

# Development server start karo
npm start

# Browser automatically open hoga: http://localhost:3000
```

#### Step 5: Test Karo
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Signup/Login test karo

---

### 🔧 ENVIRONMENT VARIABLES SETUP

#### Backend `.env` File Create Karo
```bash
# backend/.env file create karo
cd backend
touch .env  # Mac/Linux
# Windows: type nul > .env
```

**Backend `.env` Content:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sign-language_learn
NODE_ENV=development

# Production ke liye (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sign-language_learn?retryWrites=true&w=majority
```

#### Backend Code Update Karo (Environment Variables Use Karne Ke Liye)
`backend/index.js` mein ye changes karo:

```javascript
require('dotenv').config(); // Top pe add karo
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Environment variable use karo
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sign-language_learn")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Backend `package.json` mein dotenv add karo:**
```bash
cd backend
npm install dotenv
```

#### Frontend Environment Variables
`frontend/.env` file create karo:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Frontend Code Update Karo:**
`frontend/src/Signup.jsx` aur `frontend/src/Login.jsx` mein:

```javascript
// Hardcoded URL ki jagah
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Usage:
const res = await axios.post(`${API_URL}/api/signup`, formData);
```

---

### 🏗️ BUILD PROCESS

#### Frontend Build
```bash
cd frontend

# Production build create karo
npm run build

# Build folder create hoga: frontend/build/
# Is folder ko deploy karna hai
```

#### Backend Build
```bash
cd backend

# Backend ko directly deploy karo (build ki zarurat nahi)
# Bas dependencies install karo production mein
npm install --production
```

---

### 🌐 DEPLOYMENT OPTIONS

#### Option 1: Vercel (Frontend) + Render/Railway (Backend) ⭐ Recommended

**Frontend (Vercel):**
1. Vercel account banao: https://vercel.com
2. GitHub repo connect karo
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `build`
6. Environment variables add karo:
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
7. Deploy karo!

**Backend (Render):**
1. Render account banao: https://render.com
2. New Web Service create karo
3. GitHub repo connect karo
4. **Root directory**: `backend` (IMPORTANT!)
5. **Build command**: `npm install`
6. **Start command**: `node index.js`
7. **Environment variables add karo (CRITICAL!):**
   - `MONGODB_URI` = Your MongoDB Atlas connection string
     - Format: `mongodb+srv://username:password@cluster.mongodb.net/sign-language_learn?retryWrites=true&w=majority`
     - MongoDB Atlas setup: See "MongoDB Atlas Setup" section below
   - `PORT` = `10000` (optional, Render auto-sets)
   - `NODE_ENV` = `production`
8. Deploy karo!

**⚠️ IMPORTANT**: Agar MongoDB connection error aaye (`ECONNREFUSED 127.0.0.1:27017`), toh:
- MongoDB Atlas setup karo (free tier available)
- `MONGODB_URI` environment variable properly set karo
- Network Access mein IP whitelist karo (0.0.0.0/0 for testing)
- Detailed fix: See `RENDER_FIX.md`

**Backend (Railway) - Alternative:**
1. Railway account: https://railway.app
2. New Project > Deploy from GitHub
3. Root directory: `backend`
4. Environment variables add karo
5. Deploy!

---

#### Option 2: Netlify (Frontend) + Render (Backend)

**Frontend (Netlify):**
1. Netlify account: https://netlify.com
2. New site from Git
3. Build command: `cd frontend && npm install && npm run build`
4. Publish directory: `frontend/build`
5. Environment variables:
   - `REACT_APP_API_URL` = Backend URL
6. Deploy!

---

#### Option 3: AWS Deployment

**Frontend (AWS S3 + CloudFront):**
1. S3 bucket create karo
2. `frontend/build` folder upload karo
3. Static website hosting enable karo
4. CloudFront distribution create karo (optional, CDN ke liye)

**Backend (AWS EC2/Elastic Beanstalk):**
1. EC2 instance launch karo (Ubuntu)
2. Node.js install karo
3. MongoDB Atlas use karo (ya EC2 pe MongoDB install)
4. PM2 use karo process manager ke liye:
   ```bash
   npm install -g pm2
   pm2 start backend/index.js --name signbridge-api
   pm2 save
   pm2 startup
   ```

**Backend (AWS Elastic Beanstalk) - Easier:**
1. EB CLI install karo
2. `eb init` karo
3. `eb create` karo
4. Environment variables set karo
5. Deploy!

---

#### Option 4: Full Stack on Render

**Single Service (Not Recommended for Production):**
- Render pe monorepo deploy karo
- Build commands properly set karo
- Environment variables configure karo

---

### 🗄️ MONGODB ATLAS SETUP (Cloud Database)

1. MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Free cluster create karo (M0)
3. Database Access > User create karo
4. Network Access > IP whitelist (0.0.0.0/0 for all, ya specific IPs)
5. Connect > Connection string copy karo
6. Connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/sign-language_learn?retryWrites=true&w=majority
   ```
7. Backend `.env` mein `MONGODB_URI` set karo

---

### ✅ POST-DEPLOYMENT CHECKS

#### 1. Frontend Checks
- [ ] Homepage load ho raha hai?
- [ ] All routes working? (/, /about, /login, /signup, etc.)
- [ ] API calls backend se connect ho rahe hain?
- [ ] Signup/Login functionality test karo
- [ ] Camera permissions working? (sign language detection)
- [ ] No console errors?

#### 2. Backend Checks
- [ ] API endpoints accessible? (Postman/curl se test karo)
- [ ] MongoDB connection successful?
- [ ] CORS properly configured?
- [ ] Signup endpoint: `POST /api/signup`
- [ ] Login endpoint: `POST /api/login`

#### 3. Integration Checks
- [ ] Frontend se backend API calls successful?
- [ ] User signup ho raha hai?
- [ ] User login ho raha hai?
- [ ] localStorage properly working?

#### 4. Performance Checks
- [ ] Page load time acceptable?
- [ ] Images/assets loading?
- [ ] No 404 errors?

---

## 4. Potential Errors & Fixes 🐛

### Error 1: MongoDB Connection Failed
**Problem:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Fix:**
- MongoDB service start karo: `mongod` (Windows), `sudo systemctl start mongod` (Linux)
- Ya phir MongoDB Atlas use karo cloud database ke liye
- Connection string verify karo

---

### Error 2: CORS Error
**Problem:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
- Backend `index.js` mein CORS properly configure karo:
  ```javascript
  const cors = require("cors");
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
  }));
  ```

---

### Error 3: Port Already in Use
**Problem:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Fix:**
- Port change karo ya process kill karo:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

---

### Error 4: Module Not Found
**Problem:**
```
Cannot find module 'dotenv'
```

**Fix:**
- Dependencies install karo:
  ```bash
  cd backend
  npm install dotenv
  ```

---

### Error 5: React Build Fails
**Problem:**
```
Failed to compile
```

**Fix:**
- Node modules delete karo aur reinstall:
  ```bash
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  ```
- React version compatibility check karo

---

### Error 6: Environment Variables Not Working
**Problem:**
- Frontend mein env variables load nahi ho rahe

**Fix:**
- `.env` file `frontend/` folder mein hona chahiye
- Variable names `REACT_APP_` se start hone chahiye
- Server restart karo after `.env` changes
- Build time pe env variables inject hote hain, runtime pe nahi

---

### Error 7: API URL Hardcoded
**Problem:**
- Frontend mein `http://localhost:5000` hardcoded hai

**Fix:**
- Environment variable use karo:
  ```javascript
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  ```
- All API calls mein `API_URL` use karo

---

### Error 8: MongoDB Atlas Connection Timeout
**Problem:**
- Atlas se connect nahi ho raha

**Fix:**
- Network Access mein IP whitelist karo (0.0.0.0/0 for testing)
- Connection string verify karo
- Username/password special characters encode karo (URL encoding)

---

### Error 9: Build Size Too Large
**Problem:**
- Vercel/Netlify pe build fail ho raha hai size limit se

**Fix:**
- `package.json` mein build optimization:
  ```json
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build"
  }
  ```
- Large assets CDN pe move karo
- Code splitting implement karo

---

### Error 10: Camera Permissions
**Problem:**
- Webcam access nahi mil raha

**Fix:**
- HTTPS required hai production mein (HTTP pe camera access nahi milta)
- Browser permissions check karo
- `navigator.mediaDevices.getUserMedia` error handling add karo

---

## 5. Quick Deployment Checklist ✅

### Pre-Deployment
- [ ] Environment variables setup karo
- [ ] MongoDB Atlas account ready hai
- [ ] Hardcoded URLs remove karo
- [ ] CORS properly configured
- [ ] `.env` files `.gitignore` mein hain

### Deployment
- [ ] Frontend build successful
- [ ] Backend dependencies installed
- [ ] Environment variables set kiye
- [ ] MongoDB connection working
- [ ] Deploy kiya

### Post-Deployment
- [ ] All routes working
- [ ] API endpoints accessible
- [ ] Signup/Login tested
- [ ] No console errors
- [ ] HTTPS enabled (production)

---

## 6. Production Best Practices 💡

1. **Environment Variables**: Never commit `.env` files
2. **Error Handling**: Proper error messages add karo
3. **Logging**: Winston ya Morgan use karo backend logging ke liye
4. **Security**: JWT tokens add karo authentication ke liye
5. **Rate Limiting**: Express rate limit add karo
6. **HTTPS**: Always use HTTPS in production
7. **Monitoring**: Error tracking (Sentry) add karo
8. **Backup**: MongoDB regular backups

---

## 7. Support & Resources 📚

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs

---

**Happy Deploying! 🎉**

Agar koi issue aaye toh check karo:
1. Console errors
2. Network tab (API calls)
3. Environment variables
4. MongoDB connection
5. CORS configuration

