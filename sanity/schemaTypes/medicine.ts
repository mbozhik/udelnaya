import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine: SchemaTypeDefinition = {
  name: 'medicine',
  title: '[Медицина]',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название секции',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание секции',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
    },
    {
      name: 'special_offer',
      title: 'Есть ли акция на процедуру?',
      type: 'boolean',
    },
    {
      name: 'slug',
      title: 'Ссылка',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
  },
}

export default medicine
