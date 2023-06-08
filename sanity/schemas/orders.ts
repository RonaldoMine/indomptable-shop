import {defineField, defineType} from 'sanity'

const STATUS = [
    {title: "SUCCESS", value: "SUCCESS"},
    {title: "PENDING", value: "PENDING"},
    {title: "CANCELLED", value: "CANCELLED"},
    {title: "FAILED", value: "FAILED"},
]
export default defineType({
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
        defineField({
            name: 'reference',
            title: 'Référence',
            type: 'string',
        }),
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Phone number',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'town',
            title: 'Town',
            type: 'string',
            initialValue: ''
        }),
        defineField({
            name: 'email',
            title: 'Email',
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
                            type: 'number'
                        },
                        {
                            name: 'size',
                            title: 'Size',
                            type: 'string'
                        },
                        {
                            name: 'color',
                            title: 'Color',
                            type: 'string'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number'
                        },
                        {
                            name: 'image',
                            title: 'Url of the image',
                            type: 'string',
                            initialValue: ""
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
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                layout: "dropdown",
                list: STATUS
            },
            initialValue: "PENDING"
        }),
        defineField({
            name: "lang",
            title: "Language",
            type: "string",
            initialValue: "fr"
        }),
    ],
    preview: {
        select: {
            title: 'reference',
            firstName: 'firstName',
            lastName: 'lastName',
            status: 'status',
        },
        prepare(selection) {
            const {title, firstName, lastName, status} = selection
            return {
                title: " [" + status + "] " + title,
                subtitle: firstName + " " + lastName,
            }
        }
    },
})
