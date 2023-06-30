import { createClient } from "@sanity/preview-kit/client";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-01-16",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_SECRET_TOKEN,
  studioUrl: "https://indomptableshop.sanity.studio",
  encodeSourceMap: "auto",
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
