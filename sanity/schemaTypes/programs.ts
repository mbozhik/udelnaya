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
      options: {maxLength: 100},
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание программы',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
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
