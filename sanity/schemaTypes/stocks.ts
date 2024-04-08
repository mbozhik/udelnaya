import {SchemaEntityTypes} from './index'

const stocks: SchemaEntityTypes = {
  name: 'stocks',
  title: 'Stocks',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Stock Images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
}

export default stocks
