import {defineField, defineType} from 'sanity'
import moment from "moment";

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'subscribeAt',
      title: 'Subscribre At',
      type: 'date',
      initialValue: moment().format("YYYY-MM-DD")
    })
  ],

  preview: {
    select: {
      title: 'email'
    }
  },
})
