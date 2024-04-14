import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine: SchemaTypeDefinition = {
  name: 'medicine',
  title: 'Медицина',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название процедуры',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание процедуры',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'price',
      title: 'Цена процедуры',
      type: 'number',
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
      media: 'image',
    },
  },
}

export default medicine
