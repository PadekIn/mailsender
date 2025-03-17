import ejs from "ejs";
import { transporter } from "../configs/nodemailer.js";
import path from "path";
import { fileURLToPath } from 'url';

export default async (emailFor, subject, mailFormat, data = "") => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Path ke file EJS template
        const templatePath = path.join(__dirname, `../views/mail/${mailFormat}.ejs`);

        // Render EJS template dengan data
        const emailContent = await ejs.renderFile(templatePath, { data });

        const sender = {
            name: "Tim Kata Ustadz",
            address: process.env.OUR_EMAIL || "default@example.com"
        };
  
        const mailOption = {
            from: sender,
            to: emailFor,
            subject,
            html: emailContent,
        };
        await transporter.sendMail(mailOption);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};