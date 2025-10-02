# Authentication Troubleshooting Guide

## Current Error: "Cannot GET /auth/error"

This error means NextAuth is trying to access the wrong path. I've fixed this by adding `basePath: "/api/auth"` to the configuration.

---

## Quick Checklist

### ✅ Step 1: Verify Environment Variables

Check your `/frontend/.env.local` file has:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret>
GOOGLE_CLIENT_ID=<your-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-secret>
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:** No spaces in NEXTAUTH_SECRET!

### ✅ Step 2: Verify Google Console Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Check **Authorized redirect URIs** includes:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Check **Authorized JavaScript origins** includes:
   ```
   http://localhost:3000
   ```

### ✅ Step 3: Restart Development Server

After any `.env.local` changes:

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Restart
cd frontend
npm run dev
```

### ✅ Step 4: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Incognito/Private mode

### ✅ Step 5: Test the Flow

1. Go to `http://localhost:3000/login`
2. Open Browser DevTools Console (F12)
3. Click "Sign in with Google"
4. Watch for any error messages in:
   - Browser console
   - Terminal (where `npm run dev` is running)

---

## Common Errors & Solutions

### Error: "redirect_uri_mismatch"

**Cause:** The redirect URI in Google Console doesn't match.

**Solution:** 
- Add `http://localhost:3000/api/auth/callback/google` to Google Console
- Make sure there's no trailing slash
- Make sure it's exactly `/api/auth/callback/google` (not `/auth/callback/google`)

### Error: "invalid_client"

**Cause:** Wrong Client ID or Client Secret

**Solution:**
- Copy the credentials again from Google Console
- Make sure there are no extra spaces
- Restart the dev server

### Error: "Configuration"

**Cause:** Missing or invalid NEXTAUTH_SECRET

**Solution:**
```bash
# Generate a new secret
openssl rand -base64 32

# Add it to .env.local
NEXTAUTH_SECRET=<paste-the-output-here>
```

### Error: ClientFetchError / "is not valid JSON"

**Cause:** NEXT_PUBLIC_API_URL pointing to wrong URL

**Solution:**
- For local dev: `NEXT_PUBLIC_API_URL=http://localhost:5000`
- For production: `NEXT_PUBLIC_API_URL=https://your-backend.vercel.app`

---

## Debug Mode

The auth config has `debug: true` in development. Check your terminal for detailed logs:

```bash
# You should see logs like:
[auth][debug] session
[auth][debug] callback
```

If you don't see these, NextAuth might not be properly initialized.

---

## Still Not Working?

1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000
   ```

2. **Check if frontend is running:**
   ```bash
   curl http://localhost:3000
   ```

3. **Test the auth endpoint directly:**
   ```bash
   curl http://localhost:3000/api/auth/providers
   ```
   Should return JSON with Google provider info.

4. **Check browser network tab:**
   - Look for failed requests to `/api/auth/*`
   - Check the response body for error details

---

## Files I Modified

1. `/frontend/src/lib/auth.ts` - Added `basePath: "/api/auth"`
2. `/frontend/src/app/login/page.tsx` - Added error display
3. `/frontend/.env.local` - Fixed URLs for local development
4. `/frontend/src/types/next-auth.d.ts` - Added TypeScript types

---

## Next Steps

After fixing the auth:

1. Test login flow completely
2. Test logout
3. Test protected routes (e.g., `/shortLink`)
4. Update production environment variables when deploying
