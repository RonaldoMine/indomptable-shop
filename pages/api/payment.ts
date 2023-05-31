import {NextApiRequest, NextApiResponse} from "next";
import {Transaction} from "@sanity/client";
import {sanityClient} from "../../sanity";

export default async function payment(req: NextApiRequest, res: NextApiResponse) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const amount = req.body.amount//10;
    const quantity = req.body.quantity;
    const lang = req.body.lang;
    const description = "Tee-shirt";
    const regex_mtn = /^(237)?((65[0-4])|(67[0-9])|(68[0-9]))[0-9]{6}$/;
    const regex_orange = /^(237)?((65[5-9])|(69[0-9]))[0-9]{6}$/;
    const regex_email = /^[A-Z\d._%+-]+@([A-Z\d-]+\.)+[A-Z]{2,4}$/i;
    const json_messages = require(`../../public/locales/${lang}/payment.json`);
    try {
        if (firstName && lastName && email && phoneNumber && address && amount && quantity) {
            if (regex_email.test(email)) {
                if (regex_mtn.test(phoneNumber) || regex_orange.test(phoneNumber)) {
                    const API_KEY = process.env["payment-api-key"]
                    const SERVICE_KEY = process.env["payment-service-key"]
                    const URL_PAYMENT = process.env["payment-url"] + "place-deposit";
                    const reference = "indomp" + Date.now().toString();
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            api_key: API_KEY,
                            service_key: SERVICE_KEY,
                            payment_ref: reference,
                            number: phoneNumber,
                            amount: amount,
                            description: description,
                            transactional: "yes"
                        }),
                    }
                    const response = ""//await fetch(URL_PAYMENT, options);
                    const result = {status: "REQUEST_ACCEPTED", paymentId: "NXH-" + new Date().getTime()};//response ? await response.json() : null
                    if (result && result.status === 'REQUEST_ACCEPTED') {
                        //const transaction = new Transaction();
                        const products = req.body.basket.map((product: { qty: number, size: string, color: string, price: number, sku: string }) => {
                            return {
                                qty: product.qty,
                                size: product.size,
                                color: product.color,
                                price: product.price,
                                sku: product.sku
                            };
                        })
                        /*transaction.create({
                            _type: 'orders',
                            reference: reference,
                            paymentId: result.paymentId,
                            products: products,
                            totalProduct: quantity,
                            amount: amount,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            address: address,
                            email: email,
                            lang: lang
                        });*/
                        await sanityClient.create({
                            _type: 'orders',
                            reference: reference,
                            paymentId: result.paymentId,
                            products: products,
                            totalProduct: quantity,
                            amount: amount,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            address: address,
                            email: email,
                            lang: lang
                        }, {
                            autoGenerateArrayKeys: true
                        })
                        res.status(200).json({
                            message: json_messages.payment_initiated,
                            status: "PENDING",
                            paymentId: result.paymentId
                        })
                    } else {
                        res.status(500).json({message: json_messages.errors.payment_error, status: "FAILED"})
                    }
                } else {
                    res.status(401).json({message: json_messages.errors.phone})
                }
            } else {
                res.status(401).json({message: json_messages.errors.email});
            }
        } else {
            res.status(401).json({message: json_messages.errors.empty_field})
        }
    } catch (e) {
        res.status(500).json({message: json_messages.errors.general_error})
    }
}
