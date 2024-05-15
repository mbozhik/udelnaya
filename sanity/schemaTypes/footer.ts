import {Rule, SchemaTypeDefinition} from 'sanity'

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
    {
      name: 'legislation',
      title: 'Медицинское законодательство',
      type: 'file',
      validation: (rule: Rule) => rule.required(),
    },
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
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `PDF документы`,
        subtitle: `Все поля обязательны к заполнению`,
      }
    },
  },
}

export default footer
