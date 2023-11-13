import { getTransporter } from "../getTransporter";

export const send = async (email: string, subject: string, text: string) => {
    const transporter = getTransporter();

    await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: subject,
        text: text,
    });
}