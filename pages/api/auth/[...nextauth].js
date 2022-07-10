//-- NextAuth imports
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
//-- DB imports
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
// Mongoose
import dbConnect from "../../../utils/lib/dbConnect";
import Credentials from "../../../database/user_data/model/Credentials";
//-- Other
import bcrypt from "bcrypt";

// Connect to DB
dbConnect("user_data");

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          provider: "github",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: "",
          provider: "google",
        };
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Username/Email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;

        const query = {
          email: email,
        };

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~Mongoose~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Find user in credentials collection
        const user = await Credentials.findOne(query);
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return signInUser({ password, user });
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("You haven't registered yet");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // console.log(account ? account.provider : token);
      user && (token.user = user);
      token.provider = account ? account.provider : token.provider;
      return token;
    },
    session: async ({ session, token }) => {
      console.log(token);
      const savedUser = {
        id: token.user._id,
        email: token.user.email,
        username: token.user.username,
      };
      session.user = savedUser;
      return session;
    },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
  pages: {
    signIn: "/user/login",
  },
});

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("Password not correct");
  }
  return user;
};
