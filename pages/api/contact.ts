import {NextApiRequest, NextApiResponse} from "next";
import {render} from '@react-email/render';
import ContactMail from '../mail/ContactMail'

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
    if (name && email && message) {
        if (regex_email.test(email)) {
            require('dotenv').config();
            let nodemailer = require('nodemailer')
            const HOST = process.env["mail-host"]
            const PORT = process.env["mail-port"]
            const USERNAME = process.env["mail-username"]
            const PASSWORD = process.env["mail-password"]
            const transporter = nodemailer.createTransport({
                port: PORT,
                host: HOST,
                auth: {
                    user: USERNAME,
                    pass: PASSWORD
                },
                secure: false
            })
            const html = render(ContactMail({message: message}));
            const body = {
                from: USERNAME,
                to: "johnyourbest@gmail.com",
                subject: `Message From ${email}`,
                text: message,
                html: html
            }
            transporter.sendMail(body, function (err: any, info: any) {
                if (err) {
                    console.log(err)
                    res.status(500).json({message: "Votre requête n'a pas aboutie, bien vouloir recharger et la page, si le problème persiste veuillez réessayez plus tard"});
                } else {
                    console.log(info)
                    res.status(200).json({message: "Merci de nous avoir contacté! Nous reviendrons vers vous d'ici peu."});
                }
            })
        } else {
            res.status(400).json({message: "L'adresse email saisie n'est pas une adresse email valide, bien vouloir la changer!"});
        }
    } else {
        res.status(400).json({message: "Bien vouloir renseigner correctement tous les champs requis"});
    }
}
