//-- NextAuth imports
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
//-- DB imports
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
// Mongoose
import { connectToDatabase } from "../../../utils/lib/db";

// Model
import Users from "../../../model/Users";
import GameList from "../../../model/GameList";
//-- Other
import bcrypt from "bcrypt";

// Connect to DB
connectToDatabase();

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
      name: "Credential",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the user supplied
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          throw new Error(
            "Must fill out email and password field before signing in!"
          );
        }

        const query = {
          email: email,
        };
        const user = await Users.findOne(query);

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
    jwt: async ({ token, account, user, isNewUser }) => {
      user && (token.user = user);
      token.provider = account ? account.provider : token.provider;
      return token;
    },
    session: async ({ session, token }) => {
      const savedUser = {
        id: token.user.id,
        email: token.user.email,
        username: token.user.username,
        image: token.user.image,
      };
      session.user = savedUser;
      return session;
    },
  },
  events: {
    signIn: async ({ user, account, profile, isNewUser }) => {
      // If new user, create default gamelist
      if (isNewUser || !GameList.findOne({ userID: user.id })) {
        // Create default list
        const listRes = await fetch(`${process.env.NEXTAUTH_URL}/api/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: user.id }),
        }).then((response) => response.json());

        // If error...
        if (!listRes.data) {
          throw new Error("Game List could not be created on signup");
        }
      }
    },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
