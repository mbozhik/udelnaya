import {createClient} from 'next-sanity'
import ImageUrlBuilder from '@sanity/image-url'
import {getFileAsset, SanityFileAsset} from '@sanity/asset-utils'

export const client = createClient({
  projectId: 'icfob90v',
  dataset: 'production',
  apiVersion: '2024-01-08',
  useCdn: false,
})

const imageBuilder = ImageUrlBuilder(client)

export function urlForImage(source: any) {
  return imageBuilder.image(source)
}

export function urlForFile(asset: any): string {
  const fileAsset: SanityFileAsset = getFileAsset(asset, {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
  })
  return fileAsset.url
}
