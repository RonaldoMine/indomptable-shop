import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'creator',
            title: 'Creator',
            type: 'reference',
            to: {type: 'creator'},
        }),
        defineField({
            name: 'mainImage',
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
            creator: 'creator.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const {creator} = selection
            return {...selection, subtitle: creator && `by ${creator}`}
        },
    },
})
