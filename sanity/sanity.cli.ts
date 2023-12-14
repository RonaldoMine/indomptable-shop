import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0vvlpszg',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET??"development"
  }
})
