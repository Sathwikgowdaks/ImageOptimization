import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import bcrypt from "bcrypt";

// Your corrected NextAuth options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    const db = await connectToDatabase();
                    const user = await db.collection("users").findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (error) {
                    console.log("Auth error")
                    throw new Error("Error connecting to database");
                }
            },
        }),
    ],
    pages:{
        signIn:"/login",
        error:"/login",
    },
    session:{
        strategy:"jwt",
        maxAge:30 * 24 * 60 * 60,
    }, 
};