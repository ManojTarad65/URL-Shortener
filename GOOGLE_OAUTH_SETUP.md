# Google OAuth Setup Guide

## Common Error: NextAuth Google Login Redirects to `/api/auth/error`

This error typically occurs due to:
1. Missing or incorrect environment variables
2. Google OAuth credentials not configured properly
3. Redirect URI mismatch in Google Cloud Console

---

## Step-by-Step Fix

### 1. Check Your `.env.local` File

Make sure your `/frontend/.env.local` file has these variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` value.

### 3. Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add these **Authorized redirect URIs**:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-production-domain.com/api/auth/callback/google
     ```
   - Add these **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     https://your-production-domain.com
     ```

5. Copy the **Client ID** and **Client Secret** to your `.env.local` file

### 4. Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart
cd frontend
npm run dev
```

### 5. Test the Login

1. Go to `http://localhost:3000/login`
2. Click "Sign in with Google"
3. You should see the Google account selection screen
4. After selecting an account, you'll be redirected to `/shortLink`

---

## Troubleshooting

### Still getting errors?

1. **Check browser console** for detailed error messages
2. **Check terminal logs** - NextAuth debug mode is enabled in development
3. **Verify redirect URI** matches exactly in Google Console (including `/api/auth/callback/google`)
4. **Clear browser cookies** and try again
5. **Make sure NEXTAUTH_URL** is set to `http://localhost:3000` (not https for local dev)

### Error: "redirect_uri_mismatch"

This means the redirect URI in your Google Console doesn't match. Make sure you added:
```
http://localhost:3000/api/auth/callback/google
```

### Error: "invalid_client"

Your `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` is incorrect. Double-check them in Google Console.

---

## Production Deployment

When deploying to Vercel/production:

1. Update `.env.local` (or Vercel environment variables):
   ```env
   NEXTAUTH_URL=https://your-actual-domain.com
   ```

2. Add production redirect URI in Google Console:
   ```
   https://your-actual-domain.com/api/auth/callback/google
   ```

3. Add production origin:
   ```
   https://your-actual-domain.com
   ```
