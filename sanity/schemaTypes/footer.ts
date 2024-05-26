import {Rule, SchemaTypeDefinition, defineField, defineArrayMember} from 'sanity'

const footer: SchemaTypeDefinition = {
  name: 'footer',
  title: 'Футер',
  type: 'document',
  fields: [
    {
      name: 'prices',
      title: 'Цены на услуги (PDF файл)',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'credentials',
      title: 'Свидетельства, лицензии, сертификаты',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
    defineField({
      name: 'legislation',
      type: 'array',
      title: 'Медицинское законодательство',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'doc',
          fields: [
            {
              title: 'Название документа',
              type: 'string',
              name: 'label',
              validation: (rule: Rule) => rule.required(),
            },
            {
              title: 'PDF документ',
              type: 'file',
              name: 'file',
              validation: (rule: Rule) => rule.required(),
            },
          ],
        }),
      ],
    }),
    {
      name: 'privacy_policy',
      title: 'Политика конфиденциальности',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'requisites',
      title: 'Реквизиты',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'prices',
      subtitle: 'prices',
    },
    prepare() {
      return {
        title: `PDF документы`,
        subtitle: `Все поля обязательны к заполнению`,
      }
    },
  },
}

export default footer
