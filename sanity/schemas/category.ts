import {defineField, defineType} from 'sanity'

const TYPES = [
    {title: "T-Shirt", value: "t-shirt"}
]

const SIZES = [
    {title: "Size M", value: "M"},
    {title: "Size L", value: "L"},
    {title: "Size XL", value: "XL"},
    {title: "Size XXl", value: "XXL"},
]
const COLORS = [
    {title: "Color Rouge", value: "#EE1413FF"},
    {title: "Color Orange", value: "#ED720DFF"},
    {title: "Color White", value: "#FFF"},
    {title: "Color Dark", value: "#000"},
]
export default defineType({
    name: 'categories',
    title: 'Categories',
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
            name: 'type',
            title: 'Types',
            type: 'string',
            options: {
                layout: "dropdown",
                list: TYPES
            }
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: "reference",
                    to: [
                        {type: 'products'}
                    ]
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
})
