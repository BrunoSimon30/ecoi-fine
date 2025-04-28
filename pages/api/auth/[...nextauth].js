import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      id: "accessToken", // The identifier for the signIn method
      name: "Access Token", // The name for the provider
      credentials: {},
      async authorize(credentials) {
        try {
          const { accessToken, user } = credentials;
          const parsedUser = JSON.parse(user); // Parse user from JSON string
          if (parsedUser) {
            return { ...parsedUser, accessToken }; // Return parsed user with accessToken
          }
          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {},
  debug: true,
  session: {
    strategy: "jwt", // Using JWT session strategy
    maxAge: 30 * 24 * 60 * 60, // Token expiration (30 days)
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // JWT secret for signing tokens
  },
  callbacks: {
    // JWT callback: Here you will include the accessToken and user data
    jwt: async ({ token, user, trigger, session }) => {
      // On initial sign-in, save the accessToken and user data to the token
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken, // Ensure accessToken is added to the token
          user: user, // Add the user data to the token
        };
      }

      // On session update, if needed, maintain the user and token data
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          user: {
            ...token.user,
            ...session.user,
          },
        };
      }

      return token;
    },

    // Session callback: Here we pass the token data into the session
    session: async ({ session, token }) => {
      session.user = token.user; // Ensure user data is sent into session
      session.accessToken = token.accessToken; // Add accessToken to the session
      return session;
    },
  },
});
