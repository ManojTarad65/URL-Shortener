# 🔗 LinkWarp - URL Shortener

A modern, full-stack URL shortener application built with Next.js, Express, and MongoDB. Transform long URLs into sleek, shareable links with Google OAuth authentication.

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with NextAuth.js
- ⚡ **Fast URL Shortening** - Generate short URLs instantly
- 🎨 **Modern UI** - Beautiful gradient design with Framer Motion animations
- 📧 **Email Verification** - OTP-based user verification
- 🔄 **URL Redirection** - Seamless redirect to original URLs
- 📊 **MongoDB Storage** - Reliable data persistence
- 🚀 **Vercel Ready** - Optimized for serverless deployment

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **NextAuth.js** - Authentication
- **Axios** - HTTP client
- **Sonner** - Toast notifications

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nanoid** - Unique ID generation
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
URL-Shortener/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── index.js         # Express server
│   ├── vercel.json      # Vercel configuration
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   └── lib/         # Authentication config
│   └── env.example      # Environment variables template
├── DEPLOYMENT.md        # Detailed deployment guide
└── DEPLOYMENT_CHECKLIST.md  # Quick deployment checklist
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Google OAuth credentials

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManojTarad65/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   cp env.example .env.local
   # Edit .env.local with your credentials
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🌐 Deployment to Vercel

For detailed deployment instructions, see:
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete step-by-step guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist

### Quick Deploy

1. Deploy backend to Vercel (deploy first)
2. Deploy frontend to Vercel
3. Configure environment variables in Vercel Dashboard
4. Update Google OAuth redirect URIs
5. Test your deployment

## 🔐 Environment Variables

### Backend
```env
MONGO_URI=your-mongodb-connection-string
BASE_URL=your-backend-url
PORT=5000
NODE_ENV=production
AUTH_SECRET=your-auth-secret
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
FRONTEND_URL=your-frontend-url
```

### Frontend
```env
NEXTAUTH_URL=your-frontend-url
NEXTAUTH_SECRET=your-auth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=your-backend-url
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user with OTP
- `POST /api/auth/verify-otp` - Verify OTP

### URL Shortening
- `POST /shorten` - Create short URL
- `GET /:shortId` - Redirect to original URL
- `GET /api/health` - Health check

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Manoj Tarad**
- GitHub: [@ManojTarad65](https://github.com/ManojTarad65)
- Email: manojtarad65@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- MongoDB for database solution

---

Made with ❤️ by Manoj Tarad
