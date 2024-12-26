import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async(email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Two Factor Code',
    html: `<p>Two Factore Code: ${token}</p>`
  })
}

export const sendVerificationEmail = async (email: string, token: string) =>{
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`
      });
}

export const sendPasswordResetEmail = async (email: string, token: string) =>{
    const confirmationLink = `http://localhost:3000/new-password?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Link',
        html: `<p>Click <a href="${confirmationLink}">here</a> to reset password</p>`
      });
}