import {client} from '@/lib/sanity'
import {revalidateTime} from '@/lib/utils'

import Container from '#/Global/Container'
import Heading from '#/UI/Heading'
import PortableBlock from '#/UI/PortableBlock'
import Questions from '##/index/Questions'
import Error from '#/UI/Error'

interface ContactsPageProps {
  title: string
  numbers: any
  emails: any
  socials: any
  requisites: any
}

async function getData(): Promise<ContactsPageProps> {
  const data = await client.fetch<ContactsPageProps>(
    `*[_type == 'contacts'][0] {
        title,
        numbers,
        emails,
        socials,
        requisites,
    }`,
    {},
    {
      next: {
        revalidate: revalidateTime,
      },
    },
  )
  return data
}

const ContactsPage = async () => {
  const page: ContactsPageProps = await getData()

  if (!page) {
    return <Error />
  }

  const contactsData = {
    tel: {
      title: 'Телефоны:',
      icon: 'phone',
      data: page.numbers,
    },
    email: {
      title: 'Эл. почты:',
      icon: 'phone',
      data: page.emails,
    },
    socials: {
      title: 'Социальные сети',
      icon: 'phone',
      data: page.socials,
    },
    requisites: {
      title: 'Реквизиты',
      icon: 'phone',
      data: page.requisites,
    },
  }

  const ContactsBlock = ({start, end, contactsData}) =>
    Object.keys(contactsData)
      .slice(start, end)
      .map((key) => {
        const {title, data} = contactsData[key]
        return (
          <div key={key} className="space-y-4">
            <Heading type="title" text={title} />
            <PortableBlock className="space-y-1.5 sm:my-0 sm:leading-tight sm:prose-base sm:mr-10 prose-p:mb-0" prose={true} value={data} />
          </div>
        )
      })

  return (
    <Container width="2/3" className="space-y-20 mt-7">
      <div data-index="contacts" className="space-y-7">
        <Heading type="title" text="Контакты" />

        <div className="p-5 rounded-md pb-7 space-y-14 sm:space-y-10 shadow-card group sm:p-3">
          <section className="flex flex-col items-center gap-10 sm:gap-5">
            <div className="relative grid place-items-center w-full h-[45vh] sm:h-[30vh] rounded-md  overflow-hidden">
              <iframe className="relative s-full" src="https://yandex.ru/map-widget/v1/?ll=38.080230%2C55.635898&mode=search&oid=179960800782&ol=biz&sll=38.080230%2C55.635888&source=serp_navig&text=%D1%81%D0%B0%D0%BD%D0%B0%D1%82%D0%BE%D1%80%D0%B8%D0%B9%20%D1%83%D0%B4%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F&z=14" width="560" height="400" frameBorder="1" allowFullScreen></iframe>
            </div>
          </section>

          <section className="grid grid-cols-2 sm:gap-10 sm:grid-cols-1">
            <ContactsBlock start={0} end={2} contactsData={contactsData} />
          </section>

          <section className="grid grid-cols-2 sm:gap-10 sm:grid-cols-1">
            <ContactsBlock start={2} end={4} contactsData={contactsData} />
          </section>
        </div>
      </div>

      <Questions />
    </Container>
  )
}

export default ContactsPage
