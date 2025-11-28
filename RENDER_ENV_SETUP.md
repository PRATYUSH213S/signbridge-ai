# Render Environment Variable Setup - Step by Step 🔧

## Problem
Still getting `ECONNREFUSED 127.0.0.1:27017` error even after adding environment variable.

## Solution: Verify Environment Variable Setup

### Step 1: Check Render Dashboard

1. **Go to Render Dashboard**
   - https://dashboard.render.com
   - Click on your service name

2. **Navigate to Environment Tab**
   - Left sidebar: Click **"Environment"**
   - Ya phir top tabs mein **"Environment"** click karo

3. **Check if MONGODB_URI exists**
   - Scroll down to see all environment variables
   - Look for `MONGODB_URI` in the list
   - **If it's NOT there**, add it (see Step 2)
   - **If it IS there**, verify the value (see Step 3)

---

### Step 2: Add Environment Variable (If Missing)

1. **Click "Add Environment Variable"** button

2. **Add MONGODB_URI:**
   - **Key**: `MONGODB_URI`
   - **Value**: 
     ```
     mongodb+srv://prat27703_db_user:GUiPNkNFzMroPw7Y@cluster0.ggkgfel.mongodb.net/sign-language_learn?retryWrites=true&w=majority
     ```
   - **IMPORTANT**: 
     - Key name must be exactly `MONGODB_URI` (case-sensitive, no spaces)
     - Value should be the complete connection string
     - No quotes needed around the value

3. **Click "Save Changes"**
   - Render will automatically redeploy

---

### Step 3: Verify Environment Variable Value

1. **Check the value is correct:**
   - Should start with: `mongodb+srv://`
   - Should contain your username: `prat27703_db_user`
   - Should contain database name: `/sign-language_learn`
   - Should end with: `?retryWrites=true&w=majority`

2. **Common mistakes to avoid:**
   - ❌ Extra spaces before/after
   - ❌ Quotes around the value
   - ❌ Wrong key name (MONGODB_URL instead of MONGODB_URI)
   - ❌ Missing database name in connection string

---

### Step 4: Manual Redeploy (After Adding Variable)

1. **Go to "Events" or "Manual Deploy" tab**
2. **Click "Deploy latest commit"** or **"Clear build cache & deploy"**
3. **Wait for deployment to complete**

---

### Step 5: Check Logs

After redeploy, check logs:

1. **Go to "Logs" tab**
2. **Look for these messages:**

   ✅ **Success indicators:**
   ```
   MONGODB_URI is set: true
   Using MongoDB URI: Atlas (from env)
   MongoDB connected successfully
   ```

   ❌ **If still showing:**
   ```
   MONGODB_URI is set: false
   Using MongoDB URI: Localhost (fallback)
   ```
   → Environment variable still not set properly

---

## Troubleshooting

### Issue 1: Environment Variable Not Showing in Logs

**Check:**
- Variable name is exactly `MONGODB_URI` (case-sensitive)
- No extra spaces in key or value
- Clicked "Save Changes" after adding
- Service was redeployed after adding variable

**Fix:**
- Delete the variable and add it again
- Make sure to click "Save Changes"
- Manually trigger redeploy

---

### Issue 2: Still Connecting to Localhost

**Possible causes:**
1. Environment variable not saved properly
2. Service not redeployed after adding variable
3. Build cache issue

**Fix:**
1. Go to Settings > Clear build cache
2. Delete and re-add MONGODB_URI variable
3. Manual redeploy

---

### Issue 3: Connection String Format Error

**Check connection string format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

**Your connection string should be:**
```
mongodb+srv://prat27703_db_user:GUiPNkNFzMroPw7Y@cluster0.ggkgfel.mongodb.net/sign-language_learn?retryWrites=true&w=majority
```

**Verify:**
- Username: `prat27703_db_user`
- Password: `GUiPNkNFzMroPw7Y`
- Cluster: `cluster0.ggkgfel.mongodb.net`
- Database: `sign-language_learn`
- Parameters: `?retryWrites=true&w=majority`

---

### Issue 4: MongoDB Atlas Network Access

**Check MongoDB Atlas:**
1. Go to MongoDB Atlas Dashboard
2. Network Access > Check if `0.0.0.0/0` is allowed
3. If not, add it:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm

---

## Quick Checklist ✅

- [ ] Render Dashboard > Environment tab opened
- [ ] `MONGODB_URI` variable exists in the list
- [ ] Variable value is correct (starts with `mongodb+srv://`)
- [ ] Database name included (`/sign-language_learn`)
- [ ] Query parameters included (`?retryWrites=true&w=majority`)
- [ ] "Save Changes" clicked
- [ ] Service redeployed (automatic or manual)
- [ ] Logs checked - showing "MONGODB_URI is set: true"
- [ ] MongoDB Atlas Network Access configured (0.0.0.0/0)

---

## Still Not Working?

1. **Screenshot the Environment Variables section** and check:
   - Variable name spelling
   - Value format
   - No extra characters

2. **Try deleting and re-adding the variable:**
   - Delete `MONGODB_URI`
   - Save changes
   - Add it again with exact value
   - Save changes
   - Manual redeploy

3. **Check MongoDB Atlas:**
   - Database user exists
   - Password is correct
   - Network Access allows 0.0.0.0/0

4. **Contact Support:**
   - Render support: https://render.com/docs/support
   - Check Render status page for outages

---

**After fixing, logs should show:**
```
MONGODB_URI is set: true
Using MongoDB URI: Atlas (from env)
MongoDB connected successfully
Server running on port 10000
```

