import {Rule, SchemaTypeDefinition} from 'sanity'

const medicine_specialists: SchemaTypeDefinition = {
  name: 'medicine_specialists',
  title: '[Медицина] Специалисты (Список)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'ФИО',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'position',
      title: 'Должность',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'education',
      title: 'Образование',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'accreditation',
      title: 'Сертификация и аккредитация',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'work_days',
      title: 'График работы',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'work_time',
      title: 'Часы приема',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
}

export default medicine_specialists
