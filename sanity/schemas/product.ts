import {defineField, defineType} from 'sanity'
// import { baseLanguage } from '../sanity.config'

const SIZES = [
  {title: 'Size S', value: 'S'},
  {title: 'Size M', value: 'M'},
  {title: 'Size L', value: 'L'},
  {title: 'Size XL', value: 'XL'},
  {title: 'Size XXl', value: 'XXL'},
]
const COLORS = [
  {title: 'Color Rouge', value: 'red'},
  {title: 'Color Orange', value: 'orange'},
  {title: 'Color White', value: 'white'},
  {title: 'Color Black', value: 'black'},
  {title: 'Color Green', value: 'green'},
  {title: 'Color Pink', value: 'pink'},
  {title: 'Color Blue', value: 'blue'},
]
const BADGES = [{title: 'NEW PRODUCT', value: 'new'}]

export default defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  groups: [
    {
      name: 'attribute',
      title: 'Attributs',
    },
  ],
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'sizeGuide',
      title: 'Size guide',
      type: 'localeText',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'pricePromo',
      title: 'Price Promo',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover',
      type: 'image',
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              options: {
                layout: 'dropdown',
                list: COLORS,
              },
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'src',
                      title: 'Image',
                      type: 'image',
                    },
                  ],
                },
              ],
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Name',
                      type: 'string',
                      options: {
                        layout: 'dropdown',
                        list: SIZES,
                      },
                    },
                    {
                      name: 'quantity',
                      title: 'Quantity',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
            {
              name: 'totalQuantity',
              title: 'TotalQuantity',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'badges',
      title: 'Badges of product',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: BADGES,
            layout: 'tags',
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'coverImage',
      title: 'name',
    },
  },
})
