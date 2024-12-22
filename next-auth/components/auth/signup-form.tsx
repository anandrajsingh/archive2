"use client"

import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { SignupSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { signup } from "@/actions/signup"

export const SignupForm = () => {

    const [error, setError ] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined >("")

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        startTransition(() => {
            signup(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }
    return (
        <div>
            <CardWrapper headerLabel={"Create an account"} backButtonLabel={"Already have an account"} backButtonHref={"/login"}>
                <Form {...form}>
                    <form action="" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField control={form.control} name="name"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="John Doe" type="name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            />
                            <FormField control={form.control} name="email"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="johndoe@gmail.com" type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            />
                            <FormField control={form.control} name="password"
                                render={
                                    ({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="*****" type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        
                        <Button type="submit" disabled={isPending} className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}