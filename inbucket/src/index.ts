import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 2500,
    secure: false,
  });

  transporter.sendMail({
    from: '"Test User" <test@example.com>',
    to: "test@inbucket.com",
    subject: "Hello Inbucket",
    text: "This is a test email for Inbucket.",
  });