import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'productsWaitlist',
  title: 'Products Waitlist',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Name',
      type: 'reference',
      to: [{type: 'products'}],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: 'email',
      media: 'product.coverImage',
    },
  },
})
