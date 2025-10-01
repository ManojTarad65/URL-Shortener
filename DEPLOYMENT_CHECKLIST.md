# 📋 Quick Deployment Checklist

## Before Deployment

### 1. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Network Access set to 0.0.0.0/0 (Allow from anywhere)
- [ ] Connection string copied

### 2. Google OAuth Setup
- [ ] Google Cloud Console project created
- [ ] OAuth 2.0 Client ID created
- [ ] Client ID copied
- [ ] Client Secret copied
- [ ] Redirect URIs configured (will update after deployment)

### 3. Code Preparation
- [ ] All code committed to Git repository
- [ ] Repository pushed to GitHub/GitLab/Bitbucket

---

## Backend Deployment (Deploy First)

### 1. Deploy to Vercel
- [ ] Import backend folder to Vercel
- [ ] Set root directory to `backend`

### 2. Add Environment Variables
- [ ] `MONGO_URI` = `mongodb+srv://manojtarad65_db_user:2RFNSqORxUty8YSm@linkwrap.pzfclz0.mongodb.net/linkwrap`
- [ ] `BASE_URL` = `https://your-backend-url.vercel.app` (update after deployment)
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `AUTH_SECRET` = `cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=`
- [ ] `EMAIL_USER` = `manojtarad65@gmail.com`
- [ ] `EMAIL_PASS` = `wkeb sfut abyv ljms`
- [ ] `FRONTEND_URL` = (will add after frontend deployment)

### 3. After Deployment
- [ ] Copy backend URL (e.g., `https://your-backend.vercel.app`)
- [ ] Update `BASE_URL` environment variable with actual backend URL
- [ ] Test health endpoint: `https://your-backend.vercel.app/api/health`

---

## Frontend Deployment (Deploy Second)

### 1. Deploy to Vercel
- [ ] Import frontend folder to Vercel
- [ ] Set root directory to `frontend`
- [ ] Framework preset: Next.js (auto-detected)

### 2. Add Environment Variables
- [ ] `NEXTAUTH_URL` = `https://your-frontend-url.vercel.app` (update after deployment)
- [ ] `NEXTAUTH_SECRET` = `cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=`
- [ ] `GOOGLE_CLIENT_ID` = (from Google Cloud Console)
- [ ] `GOOGLE_CLIENT_SECRET` = (from Google Cloud Console)
- [ ] `NEXT_PUBLIC_API_URL` = (backend URL from previous step)

### 3. After Deployment
- [ ] Copy frontend URL (e.g., `https://your-frontend.vercel.app`)
- [ ] Update `NEXTAUTH_URL` environment variable with actual frontend URL

---

## Final Configuration

### 1. Update Backend Environment Variables
- [ ] Go to backend project in Vercel
- [ ] Update `FRONTEND_URL` with actual frontend URL
- [ ] Redeploy if needed

### 2. Update Google OAuth
- [ ] Go to Google Cloud Console
- [ ] Navigate to Credentials → OAuth 2.0 Client ID
- [ ] Add authorized redirect URI: `https://your-frontend-url.vercel.app/api/auth/callback/google`
- [ ] Save changes

### 3. Update Frontend Environment Variables
- [ ] Verify `NEXTAUTH_URL` is correct
- [ ] Verify `NEXT_PUBLIC_API_URL` points to backend
- [ ] Redeploy if needed

---

## Testing

### Backend Tests
- [ ] Visit `https://your-backend.vercel.app/api/health`
- [ ] Should return: `{"status":"ok","message":"Server is running"}`

### Frontend Tests
- [ ] Visit `https://your-frontend.vercel.app`
- [ ] Homepage loads correctly
- [ ] Click "Login" button
- [ ] Google OAuth works
- [ ] After login, redirected to `/shortLink`
- [ ] Try shortening a URL
- [ ] Short URL is generated
- [ ] Click short URL to verify redirect works

---

## Environment Variables Summary

### Backend (8 variables)
```
MONGO_URI=mongodb+srv://manojtarad65_db_user:2RFNSqORxUty8YSm@linkwrap.pzfclz0.mongodb.net/linkwrap
BASE_URL=https://your-backend.vercel.app
PORT=5000
NODE_ENV=production
AUTH_SECRET=cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=
EMAIL_USER=manojtarad65@gmail.com
EMAIL_PASS=wkeb sfut abyv ljms
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (5 variables)
```
NEXTAUTH_URL=https://your-frontend.vercel.app
NEXTAUTH_SECRET=cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

---

## 🎉 Deployment Complete!

Once all checkboxes are checked, your application should be fully deployed and functional!

**Your URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

---

## Common Issues

**CORS Error:**
- Verify `FRONTEND_URL` in backend matches actual frontend URL
- Redeploy backend after updating

**OAuth Not Working:**
- Check Google Cloud Console redirect URIs
- Verify `NEXTAUTH_URL` matches frontend URL
- Ensure `NEXTAUTH_SECRET` is the same in both projects

**MongoDB Connection Failed:**
- Check MongoDB Atlas Network Access (0.0.0.0/0)
- Verify connection string is correct
- Check MongoDB user permissions

**Short URLs Not Working:**
- Verify `BASE_URL` in backend is correct
- Check backend logs in Vercel
- Test `/api/health` endpoint
