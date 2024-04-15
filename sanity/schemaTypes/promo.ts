import {Rule, SchemaTypeDefinition} from 'sanity'

const promo: SchemaTypeDefinition = {
  name: 'promo',
  title: 'Промо-акции (Слайдер)',
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
      title: 'Изображение',
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

export default promo
