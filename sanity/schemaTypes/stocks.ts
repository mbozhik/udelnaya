import {Rule, SchemaTypeDefinition} from 'sanity'

const stocks: SchemaTypeDefinition = {
  name: 'stocks',
  title: 'Акции',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    },
    {
      name: 'caption',
      title: 'Подпись',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Stock Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'image',
    },
  },
}

export default stocks
