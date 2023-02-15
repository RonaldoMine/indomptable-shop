import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'reference',
            title: 'Référence',
            type: 'string',
        }),
        defineField({
            name: 'paymentId',
            title: 'Id du paiement',
            type: 'string',
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'sku',
                            title: 'SKU',
                            type: 'string'
                        },
                        {
                            name: 'qty',
                            title: 'Quantity',
                            type: 'string'
                        },
                        {
                            name: 'size',
                            title: 'Size',
                            type: 'string'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'string'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'totalProduct',
            title: 'Total of product',
            type: 'number',
        }),
        defineField({
            name: 'amount',
            title: 'Amount paid',
            type: 'number',
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
})
