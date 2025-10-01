# 🚀 Vercel Deployment Guide for LinkWarp URL Shortener

This guide will help you deploy both the frontend and backend of your URL Shortener application to Vercel.

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster set up
3. [Google OAuth credentials](https://console.cloud.google.com/)
4. Git repository (GitHub, GitLab, or Bitbucket)

---

## 🔧 Step 1: Prepare MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to **Network Access** → Click **Add IP Address** → Select **Allow Access from Anywhere** (0.0.0.0/0)
3. Copy your connection string from **Database** → **Connect** → **Connect your application**
4. Your connection string should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database
   ```

---

## 🔐 Step 2: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if prompted
6. For **Application type**, select **Web application**
7. Add **Authorized redirect URIs**:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-frontend-url.vercel.app/api/auth/callback/google`
8. Save and copy your **Client ID** and **Client Secret**

---

## 🖥️ Step 3: Deploy Backend to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Select the **backend** folder as the root directory
5. Configure environment variables (see below)
6. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
cd backend
npm install -g vercel
vercel login
vercel
```

### Backend Environment Variables

Add these in **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/linkwrap` |
| `BASE_URL` | Your backend Vercel URL | `https://your-backend.vercel.app` |
| `PORT` | 5000 | `5000` |
| `NODE_ENV` | production | `production` |
| `AUTH_SECRET` | Your NextAuth secret | `cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=` |
| `EMAIL_USER` | Your Gmail address | `youremail@gmail.com` |
| `EMAIL_PASS` | Your Gmail app password | `xxxx xxxx xxxx xxxx` |
| `FRONTEND_URL` | Your frontend Vercel URL | `https://your-frontend.vercel.app` |

**Note:** After deployment, copy your backend URL (e.g., `https://your-backend.vercel.app`)

---

## 🌐 Step 4: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Select the **frontend** folder as the root directory
5. Framework Preset should auto-detect **Next.js**
6. Configure environment variables (see below)
7. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
cd frontend
vercel
```

### Frontend Environment Variables

Add these in **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

| Variable | Value | Example |
|----------|-------|---------|
| `NEXTAUTH_URL` | Your frontend Vercel URL | `https://your-frontend.vercel.app` |
| `NEXTAUTH_SECRET` | Same as AUTH_SECRET from backend | `cyq4w7fisxy7W/bW7HfqOsz6xTlgwd0Z9acg/Xwn4KM=` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | `GOCSPX-xxxxxxxxxxxxx` |
| `NEXT_PUBLIC_API_URL` | Your backend Vercel URL | `https://your-backend.vercel.app` |

---

## 🔄 Step 5: Update Google OAuth Redirect URIs

After deploying the frontend:

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add your production redirect URI:
   ```
   https://your-frontend-url.vercel.app/api/auth/callback/google
   ```
5. Save changes

---

## ✅ Step 6: Verify Deployment

### Test Backend

Visit: `https://your-backend.vercel.app/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Test Frontend

1. Visit: `https://your-frontend.vercel.app`
2. Click **Login** and authenticate with Google
3. Try shortening a URL
4. Verify the short URL works and redirects correctly

---

## 🔧 Troubleshooting

### CORS Errors

- Ensure `FRONTEND_URL` in backend environment variables matches your actual frontend URL
- Check that both URLs are added to the CORS configuration

### MongoDB Connection Issues

- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check that your connection string is correct
- Ensure your MongoDB user has proper permissions

### Google OAuth Not Working

- Verify redirect URIs in Google Cloud Console match exactly
- Check that `NEXTAUTH_URL` matches your frontend URL
- Ensure `NEXTAUTH_SECRET` is the same in both frontend and backend

### Short URLs Not Working

- Verify `BASE_URL` in backend environment variables is correct
- Check that the backend is properly connected to MongoDB
- Test the `/api/health` endpoint

---

## 📝 Environment Variables Checklist

### Backend (.env)
- ✅ MONGO_URI
- ✅ BASE_URL
- ✅ PORT
- ✅ NODE_ENV
- ✅ AUTH_SECRET
- ✅ EMAIL_USER
- ✅ EMAIL_PASS
- ✅ FRONTEND_URL

### Frontend (.env.local)
- ✅ NEXTAUTH_URL
- ✅ NEXTAUTH_SECRET
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_CLIENT_SECRET
- ✅ NEXT_PUBLIC_API_URL

---

## 🎉 Success!

Your URL Shortener is now live on Vercel! 

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

## 🔄 Continuous Deployment

Vercel automatically redeploys your application when you push changes to your Git repository. Make sure to:

1. Push changes to your main/master branch
2. Vercel will automatically build and deploy
3. Check the deployment logs in Vercel Dashboard

---

## 💡 Tips

- Use Vercel's **Preview Deployments** for testing before production
- Set up **Custom Domains** in Vercel Dashboard for professional URLs
- Monitor your application using Vercel Analytics
- Keep your environment variables secure and never commit them to Git
