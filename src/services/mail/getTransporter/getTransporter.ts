import { createTransport } from 'nodemailer';

export const getTransporter = () => {
    return createTransport({
        service: process.env.NODEMAILER_SERVICE,
        port: 587,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
}