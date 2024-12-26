"use client"

import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export const LoginForm = () => {

    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email already in user with different provider"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [showTwoFactor, setShowTwoFactor] = useState(false)

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Something went wrong"))
        })
    }
    return (
        <div>
            <CardWrapper headerLabel={"Welcome Back!"} backButtonLabel={"Don't have an account"} backButtonHref={"/signup"} showSocial>
                <Form {...form}>
                    <form action="" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            {showTwoFactor && (
                                <FormField control={form.control} name="code"
                                    render={
                                        ({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Two Factor Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} placeholder="123456"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                />
                            )}
                            {!showTwoFactor && (
                                <>
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
                                                    <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                                        <Link href="/reset">
                                                            Forgot password
                                                        </Link>
                                                    </Button>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                    />
                                </>
                            )}
                        </div>
                        <FormError message={error || urlError} />
                        <FormSuccess message={success} />

                        <Button type="submit" disabled={isPending} className="w-full">
                            {showTwoFactor ? "Confirm": "Login"}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}