"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token")
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.succes)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                { !success && !error && (
                    <BeatLoader />
                )}
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
        </CardWrapper>
    )
}