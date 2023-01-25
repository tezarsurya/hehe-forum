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
  session: {
    maxAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }: any) {
      const client = createClient({
        projectId: "",
        dataset: "production",
        apiVersion: "2023-01-25",
        useCdn: true,
      });

      const doc = {
        _id: user.id,
        _type: "user",
        email: user.email,
        name: user.name,
        image: user.image,
      };
      const checkUser = await client
        .createIfNotExists(doc)
        .then((result) => true)
        .catch((error) => false);
      return checkUser;
    },
    async jwt({ token, account, profile }: any) {
      console.log(token, account, profile);
      return token;
    },
  },
};

export default NextAuth(authOptions);
