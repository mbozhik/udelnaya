import {Rule, SchemaTypeDefinition} from 'sanity'

const sanatorium: SchemaTypeDefinition = {
  name: 'sanatorium',
  title: '[Санаторий] Страницы',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
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
      name: 'about_slider',
      title: 'Слайдер',
      description: 'Для страницы «О Санатории»',
      type: 'array',
      of: [{type: 'image'}],
      hidden: ({document}) => document?.title !== 'О санатории',
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
      subtitle: 'description',
      media: 'image',
    },
  },
}

export default sanatorium
