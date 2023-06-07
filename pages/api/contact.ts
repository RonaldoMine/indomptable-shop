import {NextApiRequest, NextApiResponse} from "next";
import {render} from '@react-email/render';
import ContactMail from '../../src/emails/contact/ContactMail'
import {TRANSPORTER} from "../../src/emails/mailer";

type Result = {
    message: string
}
export default function contact(
    req: NextApiRequest, res: NextApiResponse<Result>
) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
    const langMessages = require(`../../public/locales/${req.body.lang}/contact.json`);
    if (name && email && message) {
        if (regex_email.test(email)) {
            require('dotenv').config();
            const USERNAME = process.env["MAIL_USERNAME"]
            const html = render(ContactMail({message: message, name: name, email: email}));
            const body = {
                from: USERNAME,
                to: USERNAME,
                cc: ["andremine98@gmail.com", "marcantoine826@gmail.com"],
                subject: `${langMessages.api.subject_mail} ${email}`,
                text: message,
                html: html
            }
            TRANSPORTER.sendMail(body, function (err: any, info: any) {
                if (err) {
                    res.status(500).json({message: langMessages.api.something_wrong});
                } else {
                    res.status(200).json({message: langMessages.api.email_sent});
                }
            })
        } else {
            res.status(400).json({message: langMessages.api.invalid_email});
        }
    } else {
        res.status(400).json({message: langMessages.api.field_require});
    }
}
