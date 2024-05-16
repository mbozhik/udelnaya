import {Rule, SchemaTypeDefinition} from 'sanity'

const contacts: SchemaTypeDefinition = {
  name: 'contacts',
  title: 'Контакты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'numbers',
      title: 'Телефоны',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'emails',
      title: 'Эл. почты',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'socials',
      title: 'Социальные сети',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'requisites',
      title: 'Реквизиты',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'numbers',
    },
  },
}

export default contacts
