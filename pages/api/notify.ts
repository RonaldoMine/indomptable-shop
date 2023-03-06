import {NextApiRequest, NextApiResponse} from "next";
import {sanityClient, urlFor} from "../../sanity";
import {Transaction, Patch} from "@sanity/client";
import {render} from '@react-email/render';
import {TRANSPORTER} from "../../src/emails/mailer";
import OrderMail from "../../src/emails/payment/OrderMail";
import {OrderInterface} from "../../typings";

export default async function notify(req: NextApiRequest, resp: NextApiResponse) {
    const {order_id, status} = req.body;
    const transaction = new Transaction();
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
    }`, {paymentId: order_id}).then(async (response) => {
        order = response;
    });

    if (order.length > 0) {
        const products = order[0].products
        if (status === 'SUCCESS') {
            for (const productKey in products) {
                await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct]{
                        _id,
                        name,
                        src,
                      sizes[name match $sizeName][0]{
                        _key,
                        materials[color match $colorName][0]
                      }
                    }`, {
                    sizeName: products[productKey].size,
                    slugProduct: products[productKey].sku,
                    colorName: products[productKey].color
                }).then((response) => {
                    if (response.length > 0) {
                        const {quantity} = response[0].sizes.materials;
                        order[0].products[productKey].name = response[0].name
                        order[0].products[productKey].image = urlFor(response[0].src).url()
                        let request: any = [];
                        request[`sizes[name=="${products[productKey].size}"].materials[color=="${products[productKey].color}"].quantity`] = quantity - products[productKey].qty;
                        const path = new Patch(response[0]._id).set({...request})
                        transaction.patch(path);
                        sanityClient.mutate(transaction)
                    }
                });
            }
        }
        const path = new Patch(order[0]._id).set({status: status})
        transaction.patch(path);
        sanityClient.mutate(transaction)
        sendNotifcation(order[0]);
        return resp.status(200).json({status: 1})
    }
    return resp.status(200).json({status: 0})
}


function sendNotifcation(datas: OrderInterface) {
    require('dotenv').config();
    const USERNAME = process.env["mail-username"]
    const html = render(OrderMail(datas));
    const body = {
        from: USERNAME,
        to: [datas.email, "andremine98@gmail.com", "marcantoine826@gmail.com"],
        subject: `[INDOMPTABLE] Votre commande a été reçue et validée`,
        text: "message",
        html: html
    }
    TRANSPORTER.sendMail(body, function (err: any, info: any) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}
