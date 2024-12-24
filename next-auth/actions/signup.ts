"use server"

import { SignupSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"

export const signup = async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid Fields"}
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return { error: "Email is already in use"}
    }

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    
    return { success : "User created"}
}