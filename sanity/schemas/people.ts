import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'people',
  title: 'People',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'src',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    })
  ],

  preview: {
    select: {
      title: 'title',
      media: 'src',
    },
    prepare(selection) {
      return {...selection}
    },
  },
})
