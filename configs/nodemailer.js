import { createTransport } from "nodemailer";

const email = process.env.OUR_EMAIL;
const emailPassword = process.env.OUR_EMAIL_PASSWORD;
const environment = process.env.NODE_ENV;
console.log({ email, emailPassword, environment });
const mailConfig = {
    host: "smtp.hostinger.com",
    port: environment === "development" ? 587 : 465,
    secure: environment === "development" ? false : true,
    auth: {
        user: email,
        pass: emailPassword,
    },
    logger: true,
    debug: false,
};

export const transporter = createTransport(mailConfig);