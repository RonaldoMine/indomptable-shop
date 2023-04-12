export interface ImageInterface {
    asset: {
        url: string
    }
}

export interface PeopleInterface {
    _id: string,
    title: string,
    src: ImageInterface
}

export interface ProductInterface {
    sku: string,
    qty: number,
    size: string,
    color: string,
    price: number,
    name: string,
    image: string
}

export interface OrderInterface {
    reference: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    email: string,
    paymentId: string,
    products: ProductInterface[],
    totalProduct: number,
    amount: string,
    status: string,
    lang: string
}
