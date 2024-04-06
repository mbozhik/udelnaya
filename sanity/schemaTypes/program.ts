export default {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Program Name',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Program Duration',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Program Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Program Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'pdf',
      title: 'Program PDF',
      type: 'file',
    },
    {
      name: 'slug',
      title: 'Program Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
  ],
}
