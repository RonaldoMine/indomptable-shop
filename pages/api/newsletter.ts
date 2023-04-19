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
    const email = req.body.email;
    const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
    if (email) {
        if (regex_email.test(email)) {
            /*require('dotenv').config();
            const USERNAME = process.env["mail-username"]
            const html = render(ContactMail({message: message, name: name, email: email}));
            const body = {
                from: USERNAME,
                to: ["johnyourbest@gmail.com", "andremine98@gmail.com", "marcantoine826@gmail.com"],
                subject: `[INDOMPTABLE] Message From ${email}`,
                text: message,
                html: html
            }
            TRANSPORTER.sendMail(body, function (err: any, info: any) {
                if (err) {
                    console.log(err)
                    res.status(500).json({message: "Votre requête n'a pas aboutie, bien vouloir recharger et la page, si le problème persiste veuillez réessayez plus tard"});
                } else {
                    console.log(info)
                    res.status(200).json({message: "Merci de nous avoir contacté! Nous reviendrons vers vous d'ici peu."});
                }
            })*/
            res.status(200).json({message: "Abonnement a la newsletter réussi! Jeter un coup d'oeil à votre boite mail 😉."});
        } else {
            res.status(400).json({message: "L'adresse email saisie n'est pas une adresse email valide, bien vouloir la changer!"});
        }
    } else {
        res.status(400).json({message: "Bien vouloir renseigner correctement tous les champs requis"});
    }
}
