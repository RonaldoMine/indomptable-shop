import {NextApiRequest, NextApiResponse} from "next";
import {sanityClient} from "../../sanity";
import {Transaction, Patch} from "@sanity/client";

export default async function order(req: NextApiRequest, resp: NextApiResponse) {
    const {paymentId, reference, totalProduct, amount, basket} = req.body;
    const products = basket.map((product: { qty: number, size: string, color: string, price: number, sku: string }) => {
        return {qty: product.qty, size: product.size, color: product.color, price: product.price, sku: product.sku};
    })
    const transaction = new Transaction()
    for (const productKey in products) {
        await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct]{
        _id,
      sizes[name match $sizeName][0]{
        _key,
        materials[color match $colorName][0]
      }
    }`, {sizeName: products[productKey].size, slugProduct: products[productKey].sku, colorName: products[productKey].color}).then((response) => {
            if (response.length > 0){
                const {quantity} = response[0].sizes.materials;
                let request: any = [];
                request[`sizes[name=="${products[productKey].size}"].materials[color=="${products[productKey].color}"].quantity`] = quantity - products[productKey].qty;
                //const path = new Patch(response[0]._id).set({...request})
                //transaction.patch(path);
                sanityClient.patch(response[0]._id, {
                    set: {...request}
                })
            }
        });
    }
    /*const transactions = new Transaction();
    const fetchProduct = await sanityClient.fetch(`*[_type == 'products' && sku == $slugProduct ]{
        _id,
      sizes[name match $sizeName ][0]{
        _key,
        materials[0]
      }
    }`, {sizeName: "L", slugProduct: "indomptable-the-mboa"}).then((response) => {
        const {_key, quantity} = response[0].sizes.materials;
        console.log(response, _key, quantity)
        sanityClient.patch(response[0]._id).set({
            'sizes[name=="L"].materials[color=="#FFF"].quantity': quantity - totalProduct
        }).commit();
    });*/
    /*transaction.create({
        _type: 'orders',
        reference: reference,
        paymentId: paymentId,
        products: products,
        totalProduct: totalProduct,
        amount: amount
    });*/
    sanityClient.create({
        _type: 'orders',
        reference: reference,
        paymentId: paymentId,
        products: products,
        totalProduct: totalProduct,
        amount: amount
    }, {
        autoGenerateArrayKeys: true
    }).then(() => {
        resp.status(200).json({"message": "Success"});
    }).catch(() => {
        transaction.reset();
        resp.status(500).json({"message": "Une erreur s'est produite lors de la validation de votre commande"});
    })
}
