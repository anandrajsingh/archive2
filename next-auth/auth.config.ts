import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs"

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials){
                const validatedFields = LoginSchema.safeParse(credentials)

                if(validatedFields.success){
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if(!user || !user.password) return null;

                    const correctPassword = await bcrypt.compare(password, user.password)

                    if(!correctPassword) return Response.json({message: "Password did not match"});
                    
                    return user;
                }
            }
        })
    ],
} satisfies NextAuthConfig