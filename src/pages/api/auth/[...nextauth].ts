import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { createClient } from "next-sanity";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      authorization: {
        params: { scope: "user" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, profile }: any) {
      const client = createClient({
        projectId: "0i0lc7l1",
        dataset: "production",
        apiVersion: "2021-03-25",
        token: process.env.SANITY_TOKEN,
        useCdn: true,
      });

      const doc = {
        _id: user.id,
        _type: "user",
        email: user.email,
        name: profile.login,
        image: user.image,
      };
      const checkUser = await client
        .createIfNotExists(doc)
        .then((result) => true)
        .catch((error) => false);
      return checkUser;
    },
  },
};

export default NextAuth(authOptions);
