import {Rule, SchemaTypeDefinition} from 'sanity'

const programs: SchemaTypeDefinition = {
  name: 'programs',
  title: 'Программы',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название программы',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'duration',
      title: 'Длительность программы',
      type: 'string',
    },
    {
      name: 'short_description',
      title: 'Короткое описание программы',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание программы',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'pdf',
      title: 'PDF файл',
      type: 'file',
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
      media: 'images.0.asset',
    },
  },
}

export default programs
