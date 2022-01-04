import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import TwitchProvider from 'next-auth/providers/twitch';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    {
      ...TwitchProvider({
        clientId: process.env.TWITCH_CLIENT_ID || '',
        clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
      }),
      authorization: {
        params: {
          scope: 'openid user:read:email channel:read:subscriptions',
          claims: {
            id_token: {
              email: null,
              picture: null,
              preferred_username: null,
            },
          },
        },
      },
    },
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({
    //   user, account, profile, email, credentials,
    // }) {
    //   console.log(user, profile, email, credentials, account);
    //   return true;
    // },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
  },

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: 'auto',
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
