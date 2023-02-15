import {NextApiRequest, NextApiResponse} from "next";

export default async function checkStatus(req: NextApiRequest, res: NextApiResponse<any>) {
    const paymentId = req.body.paymentId;
    if (paymentId) {
        const API_KEY = process.env["payment-api-key"]
        const URL_PAYMENT = process.env["payment-url"] + "check-payment"
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
        let message ;
        if (result.status === 'SUCCESS') {
            message = "Le paiement de votre commande a été validée avec succès! Consulter votre boite mail pour avoir tous les détails!"
        } else {
            message = "Le paiement de votre commande n'a pas abouti!"
        }
        res.status(200).json({
            message: message,
            status: result.status
        })
    } else {
        res.status(401).json({message: "Bien vouloir renseigner correctement tous les champs requis"})
    }

}
