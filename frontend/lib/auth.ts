import NextAuth, { type NextAuthOptions } from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { supabase } from './supabase';
import jwt from 'jsonwebtoken';
import type { JWT } from 'next-auth/jwt';

// --- Type Augmentation for Session ---
declare module 'next-auth' {
  interface Session {
    supabaseAccessToken?: string;
    user?: {
      id: string;
      email?: string | null;
      name?: string | null;
    };
  }
}

// --- Auth Options Configuration ---
export const authOptions: NextAuthOptions = {
  providers: [
    // Add your providers here, e.g.,
    /*
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    */
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
        session.user = {
          ...session.user,
          id: user.id,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

// --- JWT Token Verifier ---
/**
 * Verifies a JWT token from the client
 * @param token - The JWT token to verify
 * @returns The decoded token payload or null if invalid/expired
 */
export const verifyUser = async (
  token: string
): Promise<{ id: string; email?: string | null } | null> => {
  try {
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) throw new Error('SUPABASE_JWT_SECRET is not set');

    const decoded = jwt.verify(token, secret) as {
      sub: string;
      email?: string;
      exp?: number;
    };

    if (decoded.exp && Date.now() >= decoded.exp * 1000) return null;

    return {
      id: decoded.sub,
      email: decoded.email ?? null,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// --- Export for NextAuth API Route ---
export default NextAuth(authOptions);
