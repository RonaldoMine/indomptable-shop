import {defineField, defineType} from 'sanity'

const SIZES = [
    {title: "Size M", value: "M"},
    {title: "Size L", value: "L"},
    {title: "Size XL", value: "XL"},
    {title: "Size XXl", value: "XXL"},
]
const COLORS = [
    {title: "Color Rouge", value: "red"},
    {title: "Color Orange", value: "orange"},
    {title: "Color White", value: "white"},
    {title: "Color Black", value: "black"},
    {title: "Color Green", value: "green"},
]
export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    groups: [{
        name: "attribute",
        title: "Attributs",
    }],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'TypeSlug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 50,
            },
        }),
        defineField({
            name: 'sku',
            title: 'SKU',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'src',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'thumbnail',
            title: 'ThumbnailImage',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'blurry',
            title: 'BlurryImage',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: "name",
                            title: "Name",
                            type: "string",
                            options: {
                                layout: "dropdown",
                                list: SIZES
                            },
                        },
                        {
                            name: "materials",
                            title: "Materials",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        {
                                            name: "color",
                                            title: "Color",
                                            type: "string",
                                            options: {
                                                layout: "dropdown",
                                                list: COLORS
                                            },
                                        },
                                        {
                                            name: "quantity",
                                            title: "Quantity",
                                            type: "number",
                                        },
                                        {
                                            name: 'src',
                                            title: 'Image',
                                            type: 'image',
                                            options: {
                                                hotspot: true,
                                            },
                                        },
                                        {
                                            name: 'thumbnail',
                                            title: 'ThumbnailImage',
                                            type: 'image',
                                            options: {
                                                hotspot: true,
                                            },
                                        },
                                        {
                                            name: 'blurry',
                                            title: 'BlurryImage',
                                            type: 'image',
                                            options: {
                                                hotspot: true,
                                            },
                                        }
                                    ]
                                }
                            ],
                        },
                        {
                            name: "quantity",
                            type: "number"
                        }
                    ],
                }
            ],
            group: "attribute"
        }),
    ],
    preview: {
        select: {
            media: 'src',
            title: 'name',
            model: 'model.name'
        },
    },
})
