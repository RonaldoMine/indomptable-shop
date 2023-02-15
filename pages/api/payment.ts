import {NextApiRequest, NextApiResponse} from "next";

export default async function payment(req: NextApiRequest, res: NextApiResponse<any>) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const amount = 10;
    const quantity = req.body.quantity;
    const description = "Tee-shirt";
    const regex_mtn = /^(237)?((65[0-4])|(67[0-9])|(68[0-9]))[0-9]{6}$/;
    const regex_orange = /^(237)?((65[5-9])|(69[0-9]))[0-9]{6}$/;
    const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
    console.log(req.body)
    try {

        if (firstname && lastname && email && phoneNumber && address && amount && quantity) {
            if (regex_email.test(email)) {
                if (regex_mtn.test(phoneNumber) || regex_orange.test(phoneNumber)) {
                    const API_KEY = process.env["payment-api-key"]
                    const SERVICE_KEY = process.env["payment-service-key"]
                    const URL_PAYMENT = process.env["payment-url"] + "place-deposit"
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            api_key: API_KEY,
                            service_key: SERVICE_KEY,
                            payment_ref: "indomp" + Date.now().toString(),
                            number: phoneNumber,
                            amount: amount,
                            description: description,
                            transactional: "yes"
                        }),
                    }
                    const response = await fetch(URL_PAYMENT, options);
                    const result = response ? await response.json() : null
                    if (result && result.status === 'REQUEST_ACCEPTED') {
                        res.status(200).json({
                            message: "Votre paiement vient d'être initié, consulter votre téléphone pour finaliser le paiement",
                            status: "PENDING",
                            paymentId: result.paymentId
                        })
                    } else {
                        res.status(500).json({message: "Votre paiement n'a pas pu être initié", status: "FAILED"})
                    }
                } else {
                    res.status(401).json({message: "Le numéro que vous avez rensigné n'est pas correct!"})
                }
            } else {
                res.status(401).json({message: "L'adresse email saisie n'est pas une adresse email valide, bien vouloir la changer!"});
            }
        } else {
            res.status(401).json({message: "Bien vouloir renseigner correctement tous les champs requis"})
        }
    }
    catch (e) {
        res.status(500).json({message: "Les paiements sont indisponibles pour le moment, veuillez réessayer plus tard!"})
    }

}
