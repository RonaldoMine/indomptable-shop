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
