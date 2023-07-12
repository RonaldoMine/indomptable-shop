import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { render } from "@react-email/render";
import { TRANSPORTER } from "../../src/emails/mailer";
import OrderMail from "../../src/emails/payment/OrderMail";
import { OrderInterface } from "../../typings";
import AlertOrderMail from "../../src/emails/payment/AlertOrderMail";

export const config: NextFetchRequestConfig = {};
export default async function notify(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const { order_id, status } = req.body;
  let order: any;
  await sanityClient
    .fetch(
      `*[_type == 'orders' && paymentId == $paymentId ]{
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
    }`,
      { paymentId: order_id }
    )
    .then(async (response) => {
      order = response;
    });

  if (order.length > 0) {
    const products = order[0].products;
    if (status === "SUCCESS") {
      for (const productKey in products) {
        await sanityClient
          .fetch(
            `*[_type == 'products' && sku == $slugProduct]{
                        _id,
                        name,
                        coverImage,
                        colors[name match $colorName][0]{
                          _key,
                          totalQuantity,
                          sizes[label match $sizeName][0]
                        }
                    }`,
            {
              sizeName: products[productKey].size,
              slugProduct: products[productKey].sku,
              colorName: products[productKey].color,
            }
          )
          .then(async (response) => {
            if (response.length > 0) {
              const { quantity } = response[0].colors.sizes;
              order[0].products[productKey].name = response[0].name;
              //order[0].products[productKey].image = urlFor(response[0].coverImage).url()
              let request: any = [];
              request[
                `colors[name=="${products[productKey].color}"].sizes[label=="${products[productKey].size}"].quantity`
              ] = quantity - products[productKey].qty;
              request[
                `colors[name=="${products[productKey].color}"].totalQuantity`
              ] = response[0].colors.totalQuantity - products[productKey].qty;
              //const path = new Patch(response[0]._id).set({...request})
              //transaction.patch(path);
              await sanityClient
                .patch(response[0]._id, { set: { ...request } })
                .commit();
              /*sanityClient.patch(response[0]._id, {
                            set: {
                                ...request
                            }
                        })*/
            }
          });
      }
    }
    await sanityClient
      .patch(order[0]._id, { set: { status: status } })
      .commit();

    if (status === "SUCCESS") {
      sendNotification(order[0]);
      sendAlertOrder(order[0]);
    }
    return resp.status(200).json({ status: 1 });
  }
  return resp.status(200).json({ status: 0 });
}

function sendNotification(datas: OrderInterface) {
  require("dotenv").config();
  const USERNAME = process.env["MAIL_USERNAME"];
  const langMessages = require(`../../public/locales/${datas.lang}/payment.json`);
  const html = render(OrderMail(datas, langMessages.order));
  const body = {
    from: USERNAME,
    to: [datas.email],
    subject: langMessages.order.subjectMail,
    text: "message",
    html: html,
  };
  TRANSPORTER.sendMail(body, function (err: any, info: any) {
    if (err) {
      console.log(err);
    }
  });
}
function sendAlertOrder(datas: OrderInterface) {
  require("dotenv").config();
  const USERNAME = process.env["MAIL_USERNAME"];
  const html = render(AlertOrderMail(datas));
  const body = {
    from: USERNAME,
    to: ["andremine98@gmail.com"],
    subject: "💥 ALERTE NOUVELLE COMMANDE VALIDEE 💥",
    text: "message",
    html: html,
  };
  TRANSPORTER.sendMail(body, function (err: any, info: any) {
    if (err) {
      console.log(err);
    }
  });
}
