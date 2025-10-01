# 🚀 Vercel Deployment Guide - URL Shortener

## ✅ What Was Fixed

### 1. **Route Structure**
- ✅ Moved URL shortener form back to `/shortLink` route
- ✅ Created proper dynamic route `[shortLink]/page.tsx` for handling redirects
- ✅ Updated backend to return JSON instead of server-side redirect

### 2. **Next.js Configuration**
- ✅ Added `next.config.ts` with proper rewrites
- ✅ Configured standalone output for Vercel

### 3. **Backend API**
- ✅ Updated redirect controller to return JSON response
- ✅ CORS configured for Vercel domains

---

## 🔧 Deployment Steps

### **Step 1: Deploy Backend to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Root Directory**: Select `backend`
5. **Framework Preset**: Other
6. **Build Command**: Leave empty
7. **Output Directory**: Leave empty

#### **Environment Variables for Backend:**
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
MONGO_URI=your_mongodb_connection_string
BASE_URL=https://your-backend-url.vercel.app
FRONTEND_URL=https://url-shortener-beta-lemon.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NODE_ENV=production
```

8. Click **Deploy**
9. **Copy your backend URL** (e.g., `https://url-shortener-backend-xyz.vercel.app`)

---

### **Step 2: Deploy Frontend to Vercel**

1. Go back to Vercel Dashboard
2. Click **"Add New Project"** again
3. Import the same repository
4. **Root Directory**: Select `frontend`
5. **Framework Preset**: Next.js (auto-detected)

#### **Environment Variables for Frontend:**
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXTAUTH_URL=https://url-shortener-beta-lemon.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
NEXT_PUBLIC_BASE_URL=https://url-shortener-beta-lemon.vercel.app
```

⚠️ **IMPORTANT**: Replace `NEXT_PUBLIC_API_URL` with your actual backend URL from Step 1!

6. Click **Deploy**

---

### **Step 3: Update Google OAuth Redirect URIs**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add these to **Authorized redirect URIs**:
   ```
   https://url-shortener-beta-lemon.vercel.app/api/auth/callback/google
   https://your-backend-url.vercel.app/api/auth/callback/google
   ```
6. Save changes

---

### **Step 4: Redeploy Frontend**

After updating the backend URL in environment variables:
1. Go to your frontend project in Vercel
2. Click **Deployments** tab
3. Click the three dots on the latest deployment
4. Click **Redeploy**

---

## 🧪 Testing Your Deployment

### Test the following routes:

1. **Home Page**: `https://url-shortener-beta-lemon.vercel.app/`
   - Should show landing page ✅

2. **Login**: `https://url-shortener-beta-lemon.vercel.app/login`
   - Should show Google login ✅

3. **Shortener**: `https://url-shortener-beta-lemon.vercel.app/shortLink`
   - Should show URL shortener form (after login) ✅

4. **Short Link Redirect**: `https://url-shortener-beta-lemon.vercel.app/abc123`
   - Should redirect to original URL ✅

---

## 🐛 Troubleshooting

### Issue: "404 NOT_FOUND"
**Solution**: 
- Ensure `NEXT_PUBLIC_API_URL` is set correctly in frontend env vars
- Redeploy frontend after changing env vars

### Issue: "CORS Error"
**Solution**: 
- Update `FRONTEND_URL` in backend env vars
- Ensure it matches your frontend Vercel URL exactly

### Issue: "URL not found" on short links
**Solution**: 
- Check if backend is deployed and running
- Test backend directly: `https://your-backend-url.vercel.app/api/health`
- Verify MongoDB connection string is correct

### Issue: Google OAuth not working
**Solution**: 
- Update redirect URIs in Google Cloud Console
- Ensure `NEXTAUTH_URL` matches your frontend URL exactly
- Make sure `NEXTAUTH_SECRET` is the same in both frontend and backend

---

## 📝 Important Notes

1. **Environment Variables**: Always redeploy after changing environment variables
2. **Backend URL**: Must be set in frontend's `NEXT_PUBLIC_API_URL`
3. **MongoDB**: Ensure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for Vercel
4. **Logs**: Check Vercel logs if something doesn't work (Dashboard → Project → View Function Logs)

---

## ✨ Your App Structure

```
Frontend (Next.js):
├── / (landing page)
├── /login (Google OAuth)
├── /shortLink (URL shortener form)
├── /dashboard (user dashboard)
└── /[shortLink] (dynamic redirect handler)

Backend (Express):
├── POST /shorten (create short URL)
├── GET /:shortId (get original URL)
└── /api/auth/* (authentication routes)
```

---

## 🎉 Success!

Once deployed correctly, your app will:
- ✅ Show landing page at root
- ✅ Allow users to login with Google
- ✅ Create short URLs at `/shortLink`
- ✅ Redirect short links like `/abc123` to original URLs
- ✅ Work seamlessly on Vercel!

---

**Need help?** Check Vercel logs or test each route individually.
