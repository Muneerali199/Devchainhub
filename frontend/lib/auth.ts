import NextAuth, { type NextAuthOptions, type DefaultSession } from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    supabaseAccessToken?: string;
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [],
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

export default NextAuth(authOptions);