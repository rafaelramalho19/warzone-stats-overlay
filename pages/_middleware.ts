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

export function middleware(req: Request) {
  if (PROTECTED_PATHS.includes(req.nextUrl.pathname)) {
    getToken({
      req,
      secret: process.env.SECRET || '',
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith('https://')
        ?? !!process.env.VERCEL_URL,
    }).then((session) => {
      if (!session) return NextResponse.redirect('/api/auth/signin');
      return true;
    });
  }
}
