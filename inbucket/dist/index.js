"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter = nodemailer_1.default.createTransport({
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
