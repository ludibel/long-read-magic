import React from 'react'

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ handleSubmit }: FormProps) => {
  return (
    <form
      className="gap-8 bg-white px-8 py-8"
      onSubmit={handleSubmit}
      aria-label="contact form"
    >
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <input
            className="border-form mb-3 block w-full appearance-none rounded border border-strokeColor-greylight px-4 py-3 leading-tight text-textColor-greydark focus:bg-white focus:outline-none"
            id="input-name"
            type="text"
            placeholder="Name"
            name="name"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <input
            className="border-form block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-greydark focus:border-gray-500 focus:bg-white focus:outline-none"
            id="surname"
            type="text"
            placeholder="Surname"
            name="surname"
          />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <input
            className="mb-3 block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-greydark focus:border-gray-500 focus:bg-white focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
          />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <input
            className="mb-3 block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-greydark focus:border-gray-500 focus:bg-white focus:outline-none"
            id="subject"
            type="text"
            placeholder="Subject"
            name="subject"
          />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <textarea
            className="text-greydark mb-3 block w-full appearance-none rounded border  border-strokeColor-greylight px-4 py-3 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
            id="message"
            placeholder="Message"
            rows={5}
            name="message"
          />
        </div>
      </div>
      <div>
        <button
          className="text-darkblue border border-darkBlue px-6 py-2.5 capitalize hover:border-grey"
          type="submit"
          arial-label="submit form"
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default Form
