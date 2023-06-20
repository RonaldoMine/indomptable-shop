import {NextApiRequest, NextApiResponse} from "next";
import {render} from "@react-email/render";
import OrderMail from "../../src/emails/payment/OrderMail";
import {sanityClient, urlFor} from "../../sanity";

export default async function checkStatus(req: NextApiRequest, res: NextApiResponse) {
    const paymentId = req.body.paymentId;
    const lang = req.body.lang;
    const json_messages = require(`../../public/locales/${lang}/payment.json`);
    try {
        if (paymentId) {
            const API_KEY = process.env["PAYMENT_API_KEY"]
            const URL_PAYMENT = process.env["PAYMENT_URL"] + "check-payment"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: API_KEY,
                    paymentId: paymentId
                }),
            }
            const response = await fetch(URL_PAYMENT, options);
            const result = await response.json()
            let message;
            let order_pdf = "";
            if (result.status === 'SUCCESS') {
                message = json_messages.payment_done;
            } else {
                message = json_messages.payment_failed
            }
            res.status(200).json({
                message: message,
                status: result.status,
                pdf: order_pdf
            })
        } else {
            res.status(401).json({message: json_messages.errors.empty_field})
        }
    } catch (e) {
        res.status(500).json({message: json_messages.errors.general_error})
    }
}
