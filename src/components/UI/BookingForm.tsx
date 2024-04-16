'use client'

import {useState, useEffect} from 'react'

import Heading from '#/UI/Heading'
import Button from '#/UI/Button'
import {Input} from '#/UI/Input'

const Form = () => {
  const [isFormVisible, setIsFormVisible] = useState(true)
  const [submitMessage, setSubmitMessage] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

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
  }, [])

  function closeForm() {
    setIsFormVisible(false)
  }

  function submitForm(e) {
    e.preventDefault()

    const sendData = async () => {
      const data = {
        name,
        email,
        phone,
        message,
      }
    }

    sendData()
  }

  return (
    <section className={`fixed inset-0 z-50  w-screen h-screen place-items-center bg-black/25 ${isFormVisible ? 'grid' : 'hidden'}`}>
      <div id="FORM_WRAPPER" className="w-[25%] xl:w-[35%] sm:w-[95%] p-5 sm:p-3 bg-white shadow-md">
        {submitMessage ? (
          <Heading type="title" text={submitMessage} classes="text-4xl sm:text-2xl text-center" />
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <Heading type="title" classes="text-4xl sm:text-2xl" text="Бронирование" />
              <span onClick={closeForm} className="-mt-2 text-4xl leading-none duration-200 cursor-pointer hover:text-custom-primary">
                &times;
              </span>
            </div>

            <form className="space-y-1 sm:space-y-3" onSubmit={submitForm}>
              <div className="space-y-3">
                <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="px-3" />
                <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3" />
                <Input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="px-3" />

                <textarea
                  placeholder="Текст"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="px-3 sm:px-4 py-1.5 sm:py-3 w-full duration-200 bg-white placeholder:text-custom-primary
                             border-[1.5px] border-custom-primary outline-none 
                           focus-visible:border-custom-gray focus-visible:placeholder:text-custom-gray
                             disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>

              <Button type="button" classes="w-full" size="lg" text="Отправить" />
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default Form
