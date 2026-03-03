import type {Metadata} from 'next'
import localFont from 'next/font/local'

export const suisseIntl = localFont({
  src: [
    {
      path: '../assets/fonts/SuisseIntl-Light.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/SuisseIntl-Book.woff2',
      weight: '450',
    },
    {
      path: '../assets/fonts/SuisseIntl-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/SuisseIntl-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../assets/fonts/SuisseIntl-Bold.woff2',
      weight: '700',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Санаторий «Удельная» – оздоровление и реабилитация в Подмосковье',
  description: 'Медицинский центр, недорогой санаторий с лечением и отдыхом в Подмосковье. Детокс, кардиореабилитация, программы для похудения, укрепления иммунитета',
}
