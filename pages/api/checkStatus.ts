import {NextApiRequest, NextApiResponse} from "next";
import PDF from "html-pdf";
import {render} from "@react-email/render";
import OrderMail from "../../src/emails/payment/OrderMail";
import {sanityClient, urlFor} from "../../sanity";
import path from "path";

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
                await generatePDF(paymentId).then((result: any) => order_pdf = result);
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
        amount,
        lang
    }`, {paymentId: paymentId}).then(async (response: any) => {
        order = response[0];
    });
    const products = order.products;
    for (const productKey in products) {
        await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct]{
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
        });
    }
    const langMessages = require(path.join(__dirname, `../../public/locales/${order.lang}/payment.json`));
    const html = render(OrderMail(order, langMessages.order));
    let pdf_link = `orders/${order.reference}.pdf`
    PDF.create(html).toFile(`public/${pdf_link}`, (err: any, res) => {
        pdf_link = !err ? pdf_link : "";
    });
    return pdf_link;
}
