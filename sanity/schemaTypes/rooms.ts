import {subscribe} from 'diagnostics_channel'
import {Rule, SchemaTypeDefinition} from 'sanity'

const rooms: SchemaTypeDefinition = {
  name: 'rooms',
  title: 'Номера',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название номера',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание номера',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'specification',
      title: 'Спецификация номера',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [{type: 'image'}],
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
      media: 'images.0.asset',
    },
  },
}

export default rooms
