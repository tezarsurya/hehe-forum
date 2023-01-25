import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

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
      console.log(user);
      const mutations = {
        mutations: [
          {
            createIfNotExists: {
              _id: user.id,
              _type: "user",
              email: user.email,
              name: user.name,
              image: user.image,
            },
          },
        ],
      };
      const checkUser = await fetch(
        `https://0i0lc7l1.api.sanity.io/v2021-03-25/data/mutate/production`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
          },
          body: JSON.stringify(mutations),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });

      return checkUser;
    },
    async jwt({ token, account, profile }: any) {
      console.log(token, account, profile);
      return token;
    },
  },
};

export default NextAuth(authOptions);
