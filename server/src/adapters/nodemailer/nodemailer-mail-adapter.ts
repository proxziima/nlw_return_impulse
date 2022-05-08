import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f43e5f2e64c736",
        pass: "24f0ffdae8e164"
    }
});


export class NodemailMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Vinicius Queiroz <felipevs.queiroz@gmail.com>',
            subject,
            html: body,
        });
    };
}