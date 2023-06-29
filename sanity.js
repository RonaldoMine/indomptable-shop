import {createClient} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url"

/* export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-01-16',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_SECRET_TOKEN
}
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production' // "production"
const apiVersion = '2022-01-16' // "2023-05-03"

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_SECRET_TOKEN
})

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
