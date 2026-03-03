'use client'

import {useState, useEffect, useCallback, memo} from 'react'
import Cookies from 'js-cookie'
import {X} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import Text from '#/UI/Text'

const COOKIE_NAME = 'udelnaya-cookies-notify'
const SHOW_DELAY = 5000

const slideUpVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const Notification = memo(function Notification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)

    const cookieSeen = Cookies.get(COOKIE_NAME)
    if (cookieSeen) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      Cookies.set(COOKIE_NAME, 'true', {expires: 365})
    }, SHOW_DELAY)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section initial="hidden" animate="visible" exit="exit" variants={slideUpVariants} className="pb-3 sm:p-3 w-full fixed bottom-0 left-0 grid place-items-center z-[99]" role="dialog" aria-label="Уведомление о cookies">
          <div className="w-[45%] xl:w-[60%] sm:w-full px-3 sm:p-2.5 flex sm:flex-col sm:gap-2.5 justify-between items-center bg-custom-dirty-white shadow-card">
            <p className="text-[15px] sm:text-sm !leading-tight font-medium py-2.5 sm:py-0 text-custom-gray">Мы используем файлы cookie для организации работы сайта и повышения качества нашей работы. Продолжая использование сайта, вы соглашаетесь с приемом и передачей файлов cookie.</p>

            <button onClick={handleClose} className="grid place-items-center sm:self-end sm:w-full sm:py-1 cursor-pointer group sm:bg-custom-primary sm:text-white rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-custom-primary focus-visible:ring-offset-2" aria-label={isMobile ? 'Принять' : 'Закрыть уведомление'}>
              {isMobile ? <span className="text-white font-medium">Принять</span> : <X className="s-7 xl:s-6 duration-200 group-hover:text-custom-primary" />}
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
})

export default Notification
