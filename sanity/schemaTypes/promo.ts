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
      name: 'id',
      title: 'ID акции',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание программы',
      type: 'array',
      of: [{type: 'block'}],
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
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Ссылка',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'id',
      media: 'image',
    },
  },
}

export default promo
