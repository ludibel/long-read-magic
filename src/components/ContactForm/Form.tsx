import React from 'react'

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  buttonlight?: boolean
  buttondark?: boolean
}

const Form = ({ handleSubmit, buttonlight, buttondark }: FormProps) => {
  return (
    <form
      className="group gap-8 bg-white px-4 sm:px-8 py-8"
      onSubmit={handleSubmit}
      aria-label="contact form"
    >
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <input
            className="border-form mb-3 block w-full appearance-none rounded border border-strokeColor-greylight px-4 py-3 leading-tight text-textColor-greydark focus:border-textColor-bluelight focus:bg-white focus:outline-none"
            id="input-name"
            type="text"
            placeholder="Name"
            name="name"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <input
            className="border-form block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-blue focus:border-textColor-bluelight focus:bg-white focus:outline-none"
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
            className="peer mb-3 block w-full appearance-none rounded border border-strokeColor-greylight px-4 py-3 leading-tight text-textColor-blue focus:border-textColor-bluelight focus:bg-white focus:outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            id="email"
            type="email"
            placeholder="Email*"
            name="email"
            required
          />
          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <input
            className="mb-3 block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-blue focus:border-textColor-bluelight focus:bg-white focus:outline-none"
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
            className="mb-3 block w-full appearance-none rounded border border-strokeColor-greylight  px-4 py-3 leading-tight text-textColor-blue focus:border-textColor-bluelight focus:bg-white focus:outline-none "
            id="message"
            placeholder="Message*"
            rows={5}
            name="message"
            required
          />
        </div>
        <span></span>
      </div>
      <div>
        {buttonlight && (
          <button
            className="rounded-sm border border-buttonColor-type2  px-6 py-2.5 font-medium capitalize text-buttonColor-type2 hover:border-buttonColor-type2border hover:bg-buttonColor-type2bg hover:text-white hover:shadow-boxShadow-type3 active:border-buttonColor-type1 active:text-buttonColor-type1 group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit"
            arial-label="submit form"
          >
            Send
          </button>
        )}
        {buttondark && (
          <button
            className="rounded-sm border bg-buttonColor-type2bg  px-6 py-2.5 font-medium capitalize text-white hover:bg-buttonColor-type1 hover:shadow-boxShadow-type3 active:border-buttonColor-type1 group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit"
            arial-label="submit form"
          >
            Send
          </button>
        )}
      </div>
    </form>
  )
}

export default Form
