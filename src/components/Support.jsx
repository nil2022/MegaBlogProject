
import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { Switch } from '@headlessui/react'
import { BackgroundBeams } from './ui/background-beams'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/appwrite.config'

export default function Support() {

    const { register, handleSubmit } = useForm()

    const contactFormSubmit = async (data) => {
        try {
            console.log(data)
            const response = await appwriteService.createFeedbackPost(data)
            if (response) {
                alert('Feedback submitted successfully!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="isolate bg-slate-900 px-6 py-24 sm:py-10 lg:px-8 h-100vh w-full relative">
            <div className="mx-auto max-w-2xl text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-b from-slate-300 to-slate-800 bg-clip-text text-transparent sm:text-6xl">
                    Contact Us
                </h2>
                <p className="mt-4 text-lg leading-8 text-white">
                    If you are facing any issues, please fill out the form below. We will get back to you as soon as possible.
                </p>
            </div>
            <form onSubmit={handleSubmit(contactFormSubmit)}
            className="mx-auto mt-16 max-w-xl sm:mt-8 relative z-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                {...register("firstName", {
                                    required: true
                                })}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-800 transition-all duration-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                {...register("lastName")}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-800 transition-all duration-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                            "Must be a valid email address"
                                    }
                                })}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-800 transition-all duration-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                {...register("message", {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 500
                                })}
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-800 transition-all duration-500 outline-none"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <BackgroundBeams />
        </div>
    )
}