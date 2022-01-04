import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/twitch',
];

type Request = NextApiRequest & {
  nextUrl: {
    pathname: string
  }
};

export async function middleware(req: Request) {
  if (PROTECTED_PATHS.includes(req.nextUrl.pathname)) {
    const session = await getToken({
      req,
      secret: process.env.SECRET || '',
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith('https://')
        ?? !!process.env.VERCEL_URL,
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect('/api/auth/signin');
    // If user is authenticated, continue.
  }
  return true;
}
