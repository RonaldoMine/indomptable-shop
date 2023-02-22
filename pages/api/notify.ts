import {NextApiRequest, NextApiResponse} from "next";
import {sanityClient} from "../../sanity";
import {Transaction, Patch} from "@sanity/client";

export default async function notify(req: NextApiRequest, resp: NextApiResponse) {
    const {order_id, status} = req.body;
    const transaction = new Transaction();
    let order: any;
    await sanityClient.fetch(`*[_type == 'orders' && paymentId == $paymentId ]{
        _id,
        reference,
        paymentId,
        products, 
        status
    }`, {paymentId: order_id}).then(async (response) => {
        order = response;
    });

    if (order.length > 0) {
        const products = order[0].products
        if (status === 'SUCCESS') {
            for (const productKey in products) {
                await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct]{
                        _id,
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
        return resp.status(200).json({status: 1})
    }
    return resp.status(200).json({status: 0})
}
