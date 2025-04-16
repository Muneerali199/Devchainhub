// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// If you're using the `app` directory, match all routes:
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
