import {defineField, defineType} from 'sanity'

const SIZES = [
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
]
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
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover',
      type: 'image',
    }),
    defineField({
      name: 'coverThumbnail',
      title: 'CoverThumbnailImage',
      type: 'image',
    }),
    defineField({
      name: 'coverblurry',
      title: 'CoverBlurryImage',
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
                    {
                      name: 'thumbnail',
                      title: 'ThumbnailImage',
                      type: 'image',
                    },
                    {
                      name: 'blurry',
                      title: 'BlurryImage',
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
    // defineField({
    //     name: 'sizes',
    //     title: 'Sizes',
    //     type: 'array',
    //     of: [
    //         {
    //             type: 'object',
    //             fields: [
    //                 {
    //                     name: "name",
    //                     title: "Name",
    //                     type: "string",
    //                     options: {
    //                         layout: "dropdown",
    //                         list: SIZES
    //                     },
    //                 },
    //                 {
    //                     name: "materials",
    //                     title: "Materials",
    //                     type: "array",
    //                     of: [
    //                         {
    //                             type: "object",
    //                             fields: [
    //                                 {
    //                                     name: "color",
    //                                     title: "Color",
    //                                     type: "string",
    //                                     options: {
    //                                         layout: "dropdown",
    //                                         list: COLORS
    //                                     },
    //                                 },
    //                                 {
    //                                     name: "quantity",
    //                                     title: "Quantity",
    //                                     type: "number",
    //                                 },
    //                                 {
    //                                     name: 'src',
    //                                     title: 'Image',
    //                                     type: 'image',
    //                                     options: {
    //                                         hotspot: true,
    //                                     },
    //                                 },
    //                                 {
    //                                     name: 'thumbnail',
    //                                     title: 'ThumbnailImage',
    //                                     type: 'image',
    //                                     options: {
    //                                         hotspot: true,
    //                                     },
    //                                 },
    //                                 {
    //                                     name: 'blurry',
    //                                     title: 'BlurryImage',
    //                                     type: 'image',
    //                                     options: {
    //                                         hotspot: true,
    //                                     },
    //                                 }
    //                             ]
    //                         }
    //                     ],
    //                 },
    //                 {
    //                     name: "quantity",
    //                     type: "number"
    //                 }
    //             ],
    //         }
    //     ],
    //     group: "attribute"
    // }),
  ],
  preview: {
    select: {
      media: 'coverImage',
      title: 'name',
      model: 'model.name',
    },
  },
})
