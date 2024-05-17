import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { BackgroundGradient } from './ui/background-gradient.jsx'

const redirectUrlAfterVerification = import.meta.env.VITE_EMAILVERIFICATION_URL

function Signup() {

  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState("")
  // const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const response = await authService.verifyEmail(redirectUrlAfterVerification)
        if (!response) {
          throw new Error('Email verification failed!')
        }
        // const userData = await authService.getCurrentUser()
        await authService.logout()
        // console.log('User data: ', userData)
        // dispatch(login({ userData }))
        navigate("/verify-email/status")

      }
    } catch (error) {
      setError(error.message)
      console.log('Signup error: ', error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <BackgroundGradient className='rounded-[22px] p-4 sm:p-10 bg-zinc-800'
      >
        <div className='mx-auto w-full max-w-lg rounded-xl sm:p-10 text-white'>
          <div className="mb-2">
            <span className="inline-block w-full">
              <img src="/document-64.png" alt="register" width={60} className='mx-auto' />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create your account</h2>
          <p className="mt-2 text-center text-base">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}
            className='mt-8'
          >
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="John Doe"
                type="text"
                {...register("name", {
                  required: true,
                })}
                className="w-full bg-gray-700 hover:ring-2 hover:ring-violet-300 placeholder:text-slate-400"
              />
              <Input
                label="Email: "
                placeholder="john@example.com"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                      "Must be a valid email address"
                  }
                })}
                className="w-full bg-gray-700 hover:ring-2 hover:ring-violet-300 placeholder:text-slate-400"
              />
              <div className='relative flex flex-col'>
                <Input
                  label="Password: "
                  placeholder="Your Password"
                  type={passwordVisible ? 'text' : 'password'}
                  {...register("password", {
                    required: true,
                  })}
                  className="w-fullh bg-gray-700 hover:ring-2 hover:ring-violet-300 placeholder:text-slate-400"
                />
                <div className="relative w-full py-2">
                  <button type='button'
                    onClick={togglePasswordVisibility}
                    className='flex justify-center'>
                    <input
                      type="checkbox"
                      checked={passwordVisible}
                      onChange={togglePasswordVisibility}
                      className="my-auto w-[16px] h-[16px]"
                    />
                    <span className="ml-2 font-[500] text-base">
                      Show Password
                    </span>
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </form>
          <div className='text-center mt-4'>
            If you face any issue, please click on Support Tab.
          </div>
        </div>
      </BackgroundGradient>
    </div>
  )
}

export default Signup