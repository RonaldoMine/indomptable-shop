export interface ImageInterface{
    asset: {
        url: string
    }
}

export interface PeopleInterface{
    _id: string,
    title: string,
    src: ImageInterface
}

export interface OrderType{
    productId: String,
    productSize: String,
    quantity: number
}
