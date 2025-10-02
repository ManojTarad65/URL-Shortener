
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure the NEXTAUTH_URL is set in production
const NEXTAUTH_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Base configuration
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  
  // Providers configuration
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'openid email profile'
        }
      }
    }),
  ],
  
  // Pages configuration
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/"
  },
  
  // Cookies configuration
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.url-shortener-beta-lemon.vercel.app' : 'localhost'
      }
    }
  },
  
  // Callbacks
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure we always use the correct base URL
      const finalBaseUrl = NEXTAUTH_URL || baseUrl;
      
      // Handle relative URLs
      if (url.startsWith("/")) return `${finalBaseUrl}${url}`
      
      // Handle absolute URLs
      try {
        if (new URL(url).origin === finalBaseUrl) return url;
      } catch (e) {
        console.error('Error parsing URL:', e);
      }
      
      return finalBaseUrl;
    },
    
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  }
});
