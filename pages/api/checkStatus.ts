import {NextApiRequest, NextApiResponse} from "next";
import PDF from "html-pdf";
import {render} from "@react-email/render";
import OrderMail from "../../src/emails/payment/OrderMail";
import {OrderInterface} from "../../typings";
import {sanityClient, urlFor} from "../../sanity";
import {Patch} from "@sanity/client";

export default async function checkStatus(req: NextApiRequest, res: NextApiResponse<any>) {
    const paymentId = req.body.paymentId;
    const lang = req.body.lang;
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
        const response = "" //await fetch(URL_PAYMENT, options);
        const result = {status: "SUCCESS"}//await response.json()
        let message;
        let order_pdf = "";
        if (result.status === 'SUCCESS') {
            message = lang === "fr" ? "Le paiement de votre commande a été validée avec succès! Vous allez recevoir un mail avec tous les détails" : "The payment of your order has been successfully validated! You will receive an email with all the details!"
            await generatePDF(paymentId).then((result: any) => order_pdf = result);
        } else {
            message = "Le paiement de votre commande n'a pas abouti!"
        }
        res.status(200).json({
            message: message,
            status: result.status,
            pdf: order_pdf
        })
    } else {
        res.status(401).json({message: "Bien vouloir renseigner correctement tous les champs requis"})
    }
}

async function generatePDF(paymentId: string) {
    let order: any;
    await sanityClient.fetch(`*[_type == 'orders' && paymentId == $paymentId ]{
        _id,
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        reference,
        paymentId,
        products, 
        status,
        totalProduct,
        amount
    }`, {paymentId: paymentId}).then(async (response: any) => {
        order = response[0];
    });
    const products = order.products;
    for (const productKey in products) {
        console.log(products[productKey])
        /*await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct]{
                        _id,
                        name,
                        coverImage,
                        colors[name match $colorName][0]{
                          _key,
                          sizes[label match $sizeName][0]
                        }
                    }`, {
            sizeName: products[productKey].size,
            slugProduct: products[productKey].sku,
            colorName: products[productKey].color
        }).then((response) => {
            if (response.length > 0) {
                order.products[productKey].name = response[0].name
                order.products[productKey].image = urlFor(response[0].coverImage).url()
            }
        });*/
    }
    const html = render(OrderMail(order));
    let pdf_link = `orders/${order.reference}.pdf`
    PDF.create(html).toFile(`public/${pdf_link}`, (err: any, res) => {
        pdf_link = !err ? pdf_link : "";
    });
    return pdf_link;
}
