import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine_procedures: SchemaTypeDefinition = {
  name: 'medicine_procedures',
  title: '[Медицина] Процедуры (Список)',
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
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
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
      subtitle: 'description',
    },
  },
}

export default medicine_procedures
