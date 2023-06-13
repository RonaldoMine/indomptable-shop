import {NextApiRequest, NextApiResponse, NextConfig} from "next";
import {sanityClient} from "../../sanity";
import {Transaction, Patch} from "@sanity/client";
import {render} from '@react-email/render';
import {TRANSPORTER} from "../../src/emails/mailer";
import OrderMail from "../../src/emails/payment/OrderMail";
import {OrderInterface} from "../../typings";

export const config: NextFetchRequestConfig = {

}
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
        amount,
        town,
        lang
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
                        coverImage,
                        colors[name match $colorName][0]{
                          _key,
                          totalQuantity,
                          sizes[label match $sizeName][0]
                        }
                    }`, {
                    sizeName: products[productKey].size,
                    slugProduct: products[productKey].sku,
                    colorName: products[productKey].color
                }).then((response) => {
                    if (response.length > 0) {
                        const {quantity} = response[0].colors.sizes;
                        order[0].products[productKey].name = response[0].name
                        //order[0].products[productKey].image = urlFor(response[0].coverImage).url()
                        let request: any = [];
                        request[`colors[name=="${products[productKey].color}"].sizes[label=="${products[productKey].size}"].quantity`] = quantity - products[productKey].qty;
                        request[`colors[name=="${products[productKey].color}"].totalQuantity`] = response[0].colors.totalQuantity - products[productKey].qty;
                        const path = new Patch(response[0]._id).set({...request})
                        transaction.patch(path);
                        /*sanityClient.patch(response[0]._id, {
                            set: {
                                ...request
                            }
                        })*/
                    }
                });
            }
        }
        const path = new Patch(order[0]._id).set({status: status})
        transaction.patch(path);

        //sanityClient.mutate(transaction);
        await sanityClient.patch(order[0]._id, {set: {status: status}}).commit();
        sendNotification(order[0]);
        return resp.status(200).json({status: 1, order: order})
    }
    return resp.status(200).json({status: 0})
}


function sendNotification(datas: OrderInterface) {
    require('dotenv').config();
    const USERNAME = process.env["MAIL_USERNAME"]
    const langMessages = require(`../../public/locales/${datas.lang}/payment.json`);
    const html = render(OrderMail(datas, langMessages.order));
    /*PDF.create(html).toFile("./public/orders/orders.pdf", (err: any, res: any) => {
        console.log(res);
    });*/
    const body = {
        from: USERNAME,
        to: [datas.email],
        subject: langMessages.order.subjectMail,
        text: "message",
        html: html
    }
    TRANSPORTER.sendMail(body, function (err: any, info: any) {
        if (err) {
            console.log(err)
        }
    })
}
