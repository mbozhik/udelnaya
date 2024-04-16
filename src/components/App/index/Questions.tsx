import Heading from '#/UI/Heading'
import Button from '#/UI/Button'

import {headerContent} from '#/Global/Header'

export default function Questions() {
  return (
    <section data-section="questions-index" className="my-20 bg-custom-light-gray py-20">
      <div className="flex flex-col items-center gap-7">
        <div className="space-y-2 text-center">
          <Heading type="title" text="У вас остались вопросы?" />
          <Heading type="caption" classes="w-[70%] sm:w-[95%] mx-auto" text="Вы можете оставить заявку на сайте и наш менеджер свяжется с вами, либо наберите нас прямо сейчас!" />
        </div>

        <div className="flex gap-3 sm:gap-2 sm:flex-col sm:w-[93%]">
          <Button type="link" href={headerContent.contacts.tel.href} classes="px-14 sm:!w-full" variant="secondary" size="lg" adavanced_hover={true} text="Позвонить нам" />
          <Button type="button" classes="px-14 sm:!w-full" size="lg" adavanced_hover={true} text="Оставить заявку" />
        </div>
      </div>
    </section>
  )
}
