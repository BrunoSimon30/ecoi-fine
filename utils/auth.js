import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          // Return user object if credentials match
          return { id: 1, name: "Admin" };
        }
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  pages: {},
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: async ({ token, trigger, session, account, user }) => {
      if (account) {
        user && (token = user);
      }
      if (trigger === "update" && session?.user) {
        const { user, ...res } = token;
        token = { ...res, user: { ...session.user } };
      }
      return token;
    },
    session: async ({ session, token }) => {
      const user = token;
      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
