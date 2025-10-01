# ⚡ Quick Start - Deploy in 10 Minutes

This is the fastest way to get your URL Shortener deployed on Vercel.

---

## 🎯 Prerequisites (5 minutes)

### 1. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/Select a project
3. **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google` (for now)
6. **Copy** your Client ID and Client Secret

### 2. Verify MongoDB
- Your MongoDB is already configured: ✅
- Connection string: `mongodb+srv://manojtarad65_db_user:...@linkwrap.pzfclz0.mongodb.net/linkwrap`
- Make sure Network Access allows 0.0.0.0/0 in MongoDB Atlas

---

## 🚀 Deploy Backend (3 minutes)

### Step 1: Push to Git
```bash
cd /Users/apple/Documents/Web\ Dev/URL-Shortener
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. **Root Directory**: `backend`
4. Click **Deploy**

### Step 3: Add Environment Variables
After deployment, go to **Settings** → **Environment Variables** and add:

```
MONGO_URI=mongodb+srv://manojtarad65_db_user:2RFNSqORxUty8YSm@linkwrap.pzfclz0.mongodb.net/linkwrap
BASE_URL=https://your-backend-url.vercel.app
PORT=5000
NODE_ENV=production
AUTH_SECRET=cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=
EMAIL_USER=manojtarad65@gmail.com
EMAIL_PASS=wkeb sfut abyv ljms
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:** Replace `your-backend-url` with your actual Vercel URL (copy from deployment)

Click **Redeploy** after adding variables.

**✅ Copy your backend URL** (e.g., `https://url-shortener-backend-abc123.vercel.app`)

---

## 🌐 Deploy Frontend (2 minutes)

### Step 1: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same repository**
3. **Root Directory**: `frontend`
4. Click **Deploy**

### Step 2: Add Environment Variables
Go to **Settings** → **Environment Variables** and add:

```
NEXTAUTH_URL=https://your-frontend-url.vercel.app
NEXTAUTH_SECRET=cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=
GOOGLE_CLIENT_ID=your-google-client-id-from-step-1
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-step-1
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

**Important:** 
- Replace `your-frontend-url` with actual Vercel URL
- Replace `your-backend-url` with backend URL from previous step
- Use Google credentials from Prerequisites

Click **Redeploy** after adding variables.

**✅ Copy your frontend URL** (e.g., `https://url-shortener-frontend-xyz789.vercel.app`)

---

## 🔄 Final Updates (2 minutes)

### 1. Update Backend Environment Variables
Go back to **backend project** in Vercel:
- Update `BASE_URL` with actual backend URL
- Update `FRONTEND_URL` with actual frontend URL
- Click **Redeploy**

### 2. Update Frontend Environment Variables
Go to **frontend project** in Vercel:
- Update `NEXTAUTH_URL` with actual frontend URL
- Click **Redeploy**

### 3. Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   ```
   https://your-frontend-url.vercel.app/api/auth/callback/google
   ```
5. **Save**

---

## ✅ Test Your Deployment

### 1. Test Backend
Visit: `https://your-backend-url.vercel.app/api/health`

Should see:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Test Frontend
1. Visit: `https://your-frontend-url.vercel.app`
2. Click **Login**
3. Sign in with Google
4. Try shortening a URL
5. Click the short URL to verify redirect

---

## 🎉 You're Live!

Your URL Shortener is now deployed and running on Vercel!

**Your URLs:**
- 🌐 Frontend: `https://your-frontend-url.vercel.app`
- ⚙️ Backend: `https://your-backend-url.vercel.app`

---

## 🆘 Troubleshooting

### "CORS Error"
- Check `FRONTEND_URL` in backend environment variables
- Make sure it matches your actual frontend URL
- Redeploy backend

### "OAuth Error"
- Verify Google redirect URI is correct
- Check `NEXTAUTH_URL` matches frontend URL
- Ensure `NEXTAUTH_SECRET` is the same in both projects

### "MongoDB Connection Failed"
- Go to MongoDB Atlas → Network Access
- Add IP: 0.0.0.0/0 (Allow from anywhere)

### "Short URL Not Working"
- Check `BASE_URL` in backend environment variables
- Should match your backend Vercel URL
- Redeploy backend

---

## 📚 Need More Help?

- **Detailed Guide**: See `DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **All Changes**: See `CHANGES_SUMMARY.md`

---

## 💡 Pro Tips

1. **Custom Domain**: Add a custom domain in Vercel Dashboard for professional URLs
2. **Monitoring**: Use Vercel Analytics to track performance
3. **Logs**: Check deployment logs in Vercel if something goes wrong
4. **Preview**: Vercel creates preview deployments for every push - test before merging!

---

**Total Time:** ~10 minutes ⏱️

Happy deploying! 🚀
