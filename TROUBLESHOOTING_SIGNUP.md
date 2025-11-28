# Signup Failed Error - Troubleshooting Guide 🔍

## Problem
"Signup failed" error showing when trying to create an account.

## Possible Reasons & Solutions

### 1. Backend Not Running (Most Common)

**Check:**
- Is your backend server running?
- If testing locally: Is `http://localhost:5000` accessible?

**Solution:**
```bash
# Terminal 1: Start Backend
cd backend
npm start
# Should see: "Server running on port 5000" and "MongoDB connected"
```

**Verify:**
- Open browser: http://localhost:5000
- Should see some response (even if it's an error page)

---

### 2. Frontend Using Wrong API URL

**Check:**
- Open browser console (F12)
- Look for: `API_URL: http://localhost:5000` or your Render URL
- If you see `http://localhost:5000` but backend is on Render, that's the issue!

**Solution:**

**Option A: Local Development (Backend on localhost)**
1. Make sure backend is running locally
2. Frontend will use `http://localhost:5000` by default

**Option B: Using Render Backend**
1. Create `frontend/.env` file:
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
2. Restart frontend dev server:
   ```bash
   cd frontend
   npm start
   ```

---

### 3. CORS Error

**Check Browser Console:**
- Look for: `CORS policy` or `Access-Control-Allow-Origin` error

**Solution:**
- Backend already has CORS enabled
- If still getting CORS error, check backend `index.js`:
  ```javascript
  app.use(cors()); // Should be there
  ```

---

### 4. MongoDB Connection Issue (Backend Error)

**Check Backend Logs:**
- If backend is on Render, check Render logs
- Look for: `MongoDB connection error` or `ECONNREFUSED`

**Solution:**
- See `RENDER_FIX.md` for MongoDB Atlas setup
- Make sure `MONGODB_URI` environment variable is set in Render

---

### 5. Network Error (Backend Not Accessible)

**Check:**
- Browser console: Network tab
- Look for failed request to `/api/signup`
- Check error message: "Cannot connect to server"

**Solution:**
- Verify backend URL is correct
- Check if backend is deployed and running
- Test backend directly:
  ```bash
  curl https://your-backend-url.onrender.com/api/signup \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","password":"test123"}'
  ```

---

### 6. Email Already Exists

**Check:**
- Try with a different email address
- Error message should say: "Email already exists"

**Solution:**
- Use a different email
- Or delete existing user from MongoDB

---

## Quick Debugging Steps

### Step 1: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try signup again
4. Look for:
   - `API_URL: ...` - Shows which backend URL is being used
   - `Form data: ...` - Shows what data is being sent
   - Any error messages

### Step 2: Check Network Tab
1. DevTools > Network tab
2. Try signup again
3. Look for request to `/api/signup`
4. Check:
   - Status code (200 = success, 400/500 = error)
   - Response tab - see actual error message from backend

### Step 3: Check Backend Status

**If Backend is Local:**
```bash
# Check if running
curl http://localhost:5000
```

**If Backend is on Render:**
- Go to Render Dashboard
- Check service status (should be "Live")
- Check logs for errors

---

## Common Error Messages & Fixes

### "Cannot connect to server"
- **Reason**: Backend not running or wrong URL
- **Fix**: Start backend or update `REACT_APP_API_URL` in frontend `.env`

### "Email already exists"
- **Reason**: User with this email already registered
- **Fix**: Use different email or delete existing user

### "Something went wrong" (500 error)
- **Reason**: Backend error (usually MongoDB connection)
- **Fix**: Check backend logs, verify MongoDB connection

### CORS Error
- **Reason**: CORS not configured properly
- **Fix**: Backend already has CORS, but verify it's enabled

### Network Error / Timeout
- **Reason**: Backend not accessible or slow
- **Fix**: Check backend URL, verify deployment status

---

## Testing Checklist

- [ ] Backend is running (local or Render)
- [ ] Frontend `.env` has correct `REACT_APP_API_URL`
- [ ] Browser console shows correct API_URL
- [ ] Network tab shows request being made
- [ ] Backend logs show request received
- [ ] MongoDB connection successful (check backend logs)
- [ ] No CORS errors in console
- [ ] Email is unique (not already registered)

---

## Still Not Working?

1. **Check Browser Console** - Look for exact error message
2. **Check Network Tab** - See request/response details
3. **Check Backend Logs** - See if request reached backend
4. **Test Backend Directly** - Use Postman or curl to test API

**Share these details for help:**
- Browser console errors
- Network tab request details
- Backend logs
- API_URL being used

