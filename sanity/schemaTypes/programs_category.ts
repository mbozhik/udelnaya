import {Rule, SchemaTypeDefinition} from 'sanity'

const programs: SchemaTypeDefinition = {
  name: 'programs_category',
  title: '[Программы] Категории',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название категории',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание категории',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'id',
      title: 'ID категории',
      description: 'От 1 до 3',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Изображение категории',
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
      subtitle: 'id',
      media: 'image',
    },
  },
}

export default programs
