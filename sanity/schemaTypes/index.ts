export interface SchemaEntityTypes {
  name: string
  title: string
  type: string
  fields: {
    name: string
    title: string
    type: string
    of?: [{type: string}]
    options?: {
      source: string
    }
  }[]
}

import program from './program'
import stocks from './stocks'

export const schemaTypes = [program, stocks]
