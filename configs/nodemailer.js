import { createTransport } from "nodemailer";

const email = process.env.USER_EMAIL;
const emailPassword = process.env.USER_EMAIL_PASSWORD;
const environment = process.env.NODE_ENV;
console.log({ email, emailPassword, environment });
const mailConfig = {
    host: process.env.HOST_MAIL,
    port: environment === "development" ? 587 : 465,
    secure: environment === "development" ? false : true,
    auth: {
        user: email,
        pass: emailPassword,
    },
    logger: environment === "development",
    debug: environment === "development",
};

export const transporter = createTransport(mailConfig);