'use client'

import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import {useState, useEffect} from 'react'

import Heading from '#/UI/Heading'
import Button from '#/UI/Button'
import {Input} from '#/UI/Input'

const schema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  time: z.string(),
  wish: z.string(),
})

type FormFields = z.infer<typeof schema>
type CloseFormFunction = () => void

type BookingFormProps = {
  closeForm: CloseFormFunction
  pre_name?: string
  pre_email?: string
}

const BoockingForm: React.FC<BookingFormProps> = ({closeForm, pre_name, pre_email}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({
    defaultValues: {
      name: pre_name || '',
      email: pre_email || '',
      time: '',
      phone: '',
      wish: '',
    },
    resolver: zodResolver(schema),
  })

  const [submitMessage, setSubmitMessage] = useState('')

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwbj6gajsfpBfzkbncjcO0SPo-fiQwyk2_G8aEFZMKRLwupzTXPXqVeUc57ZLOCBaizVA/exec'

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      const responseData = await response.json()
      console.log('Response Data:', responseData)

      setSubmitMessage('Отправлено')
      setTimeout(() => {
        closeForm()
      }, 1500)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const formElement = document.getElementById('FORM_WRAPPER')
      if (formElement && !formElement.contains(event.target)) {
        closeForm()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeForm])

  return (
    <section className="fixed inset-0 z-50 grid w-screen h-screen place-items-center bg-black/25">
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 sm:p-3 bg-white shadow-md">
        {submitMessage ? (
          <Heading type="title" text={submitMessage} className="text-4xl sm:text-2xl text-center" />
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <Heading type="title" className="text-3xl sm:text-2xl" text="Бронирование" />
              <span onClick={closeForm} className="-mt-2 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-primary">
                &times;
              </span>
            </div>

            <form className="space-y-4 sm:space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input {...register('name')} type="text" placeholder="Имя" />
                {errors.name && <div className="text-red-500">{errors.name.message}</div>}

                <Input {...register('email')} type="text" placeholder="E-mail" />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}

                <Input {...register('phone')} type="text" placeholder="Телефон" />
                {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}

                <Input {...register('time')} type="text" placeholder="Дата и время заезда" />
                {errors.time && <div className="text-red-500">{errors.time.message}</div>}

                <textarea
                  {...register('wish')}
                  placeholder="Сообщение"
                  rows={5}
                  className="px-3.5 py-1.5 sm:py-3 w-full rounded-md duration-200 
                             border-[1.5px] border-custom-gray outline-none bg-white 
                             focus-visible:border-custom-primary focus-visible:placeholder:text-custom-primary 
                             disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-custom-gray"
                ></textarea>
                {errors.wish && <div className="text-red-500">{errors.wish.message}</div>}
              </div>

              <Button disabled={isSubmitting} type="submit" text={isSubmitting ? 'Отправка...' : 'Отправить'} size="lg" adavanced_hover={true} className="w-full border-none" />
              {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default BoockingForm
