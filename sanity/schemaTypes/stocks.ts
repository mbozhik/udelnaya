export default {
  name: 'stocks',
  title: 'Stocks',
  type: 'document',
  fields: [
    {
      name: 'images',
      tile: 'Stock Images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
}
