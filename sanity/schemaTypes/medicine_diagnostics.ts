import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine_diagnostics: SchemaTypeDefinition = {
  name: 'medicine_diagnostics',
  title: '[Медицина] Диагностика (Список)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название диагностической процедуры',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Описание диагностической процедуры',
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

export default medicine_diagnostics
