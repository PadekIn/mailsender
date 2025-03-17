import "dotenv/config";
import fastify from 'fastify';
import sendMail from './utils/sendMail.js';

const app = fastify({ logger: true });

// Declare a route
app.post('/send-mail', async (request, reply) => {
    try {
        const { emailFor, subject, mailFormat, data } = request.body;
        console.log({emailFor, subject, mailFormat, data});
        const sending = await sendMail(emailFor, subject, mailFormat, data);

        if (!sending) {
            throw new Error('Failed to send email');
        }

        reply.status(200).send({ success: true, message: 'Email sent successfully', data: null });
    } catch (error) {
        reply.status(500).send({ success: false, message: 'Failed to send email', error: error.message });
    }
});

// Run the server!
const start = async () => {
    try {
        await app.listen({ port: 9000, host: "0.0.0.0" });
        console.log(`Server listening on ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();