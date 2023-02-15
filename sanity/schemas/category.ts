import {defineField, defineType} from 'sanity'

const TYPES = [
    {title: "T-Shirt", value: "t-shirt"}
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
