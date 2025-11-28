# SignBridge-AI - Quick Start Guide 🚀

## Prerequisites
- Node.js v16+ installed
- MongoDB installed (local) or MongoDB Atlas account
- npm installed

---

## Local Setup (5 Minutes)

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/sign-language_learn
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000
npm start
```

### 3. Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sign-language_learn
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Deployment (Vercel + Render)

### Frontend (Vercel)
1. Connect GitHub repo
2. Root: `frontend`
3. Build: `npm run build`
4. Output: `build`
5. Env: `REACT_APP_API_URL` = your backend URL

### Backend (Render)
1. Connect GitHub repo
2. Root: `backend`
3. Build: `npm install`
4. Start: `node index.js`
5. Env: `MONGODB_URI` = MongoDB Atlas URI

---

## Common Issues

**MongoDB not connecting?**
- Start MongoDB: `mongod` (Windows) or `sudo systemctl start mongod` (Linux)
- Or use MongoDB Atlas

**CORS Error?**
- Backend CORS already configured
- Check frontend API URL in .env

**Port already in use?**
- Change PORT in backend .env
- Or kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

---

For detailed guide, see `DEPLOYMENT_GUIDE.md`

