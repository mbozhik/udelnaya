import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine: SchemaTypeDefinition = {
  name: 'medicine',
  title: '[Медицина] Категории',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название секции',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'procedures',
      title: 'Список процедур',
      type: 'array',
      of: [{type: 'reference', to: {type: 'medicine_procedures'}}],
      hidden: ({document}) => document?.name !== 'Процедуры',
    },
    {
      name: 'short_description',
      title: 'Короткое описание программы',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание программы',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      validation: (rule: Rule) => rule.required(),
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
