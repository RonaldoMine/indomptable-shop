import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'model',
    title: 'Model',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'little_description',
            title: 'Little Description',
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
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
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
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: {type: 'category'},
        }),
        defineField({
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [
                {
                    type: 'block'
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: 'name',
            category: 'category.name',
        },
    },
})
