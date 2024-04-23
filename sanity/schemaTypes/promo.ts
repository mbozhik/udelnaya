import {Rule, SchemaTypeDefinition} from 'sanity'

const promo: SchemaTypeDefinition = {
  name: 'promo',
  title: 'Промо-акции',
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
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'mobile_image',
      title: 'Мобильное изображение',
      type: 'image',
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
