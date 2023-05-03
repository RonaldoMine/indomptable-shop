import {NextApiRequest, NextApiResponse} from "next";
import {sanityClient} from "../../sanity";
import {Transaction} from "@sanity/client";
import moment from "moment";

type Result = {
    message: string
}
export default async function contact(
    req: NextApiRequest, res: NextApiResponse<Result>
) {
    const email = req.body.email;
    const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
    const langMessages = require(`../../public/locales/${req.body.lang}/newsletter.json`);
    if (email) {
        if (regex_email.test(email)) {
            let emailExist: any = null;
            await sanityClient.fetch(`*[_type == 'newsletter' && email == $email ]{
                _id,
                email
            }`, {email: email}).then(async (response) => {
                emailExist = response;
            });
            if (emailExist.length === 0) {
                await sanityClient.create({
                    _type: 'newsletter',
                    email: email,
                    subscribeAt: moment().format("YYYY-MM-DD")
                });
                res.status(200).json({message: langMessages.api.email_save});
            } else {
                res.status(400).json({message: langMessages.api.email_already_exist});
            }
        } else {
            res.status(400).json({message: langMessages.api.invalid_email});
        }
    } else {
        res.status(400).json({message: langMessages.api.field_require});
    }
}
