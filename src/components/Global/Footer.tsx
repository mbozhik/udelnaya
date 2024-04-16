import Button from '#/UI/Button'
import Link from 'next/link'
import Container from '../UI/Container'

const footerContent = {
  nav: {
    1: {name: 'Важная информация', href: '#'},
    2: {name: 'Свидетельства, лицензии, сертификаты', href: '#'},
    3: {name: 'Медицинское законодательство', href: '#'},
    4: {name: 'Политика конфиденциальности', href: '#'},
    5: {name: 'Реквизиты', href: '#'},
  },
  contacts: {
    tel: {name: '8 (800) 100-35-45', href: 'tel:+78001003545'},
  },
}

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-custom-light-gray pt-10 pb-5 mt-20">
      <Container padding={false}>
        <div className="space-y-7 xl:space-y-5 sm:space-y-7">
          <Button type="link" href="/" size="lg" classes="uppercase" adavanced_hover={true} text={`Цены на услуги ${currentYear}`} />

          <div className="space-y-2 sm:space-y-5">
            <div className="flex sm:flex-col justify-between sm:gap-2">
              {Object.values(footerContent.nav).map((link, idx) => (
                <Link className="xl:text-xs sm:text-sm hover:text-custom-primary duration-200" href={link.href} key={idx}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="xl:text-sm sm:text-sm flex sm:flex-col sm:text-left justify-between text-center text-custom-primary">
              <span>ООО «Санаторий Удельная»</span>
              <span>© 2024 | sanatoriyudelnaya.ru</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
