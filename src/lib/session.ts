import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.NEXT_PUBLIC_JWT_SECRET || '',
    cookieName: 'pick-room/cookie-session',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
