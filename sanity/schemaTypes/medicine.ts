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
      name: 'specialists',
      title: 'Список специалистов',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'medicine_specialists',
          },
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
      hidden: ({document}) => document?.name !== 'Специалисты',
    },
    {
      name: 'diagnostics',
      title: 'Список диагностических процедур',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'medicine_diagnostics',
          },
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
      hidden: ({document}) => document?.name !== 'Диагностика',
    },
    {
      name: 'procedures',
      title: 'Список процедур',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'medicine_procedures',
          },
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
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
      subtitle: 'short_description',
      media: 'image',
    },
  },
}

export default medicine
