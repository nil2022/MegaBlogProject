import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const authSlice = useSelector((state) => state.auth)
    console.log('authSlice: (in Login component(in components/Login.jsx)) ', authSlice)

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                console.log('Login Successfull !')
                const userData = await authService.getCurrentUser()
                if (userData) {
                    console.log('userData: (in Login component(in components/Login.jsx)) ', userData)
                    dispatch(authLogin({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
            console.log('Login error: ', error)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className='className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                        "Must be a valid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                // validate: {
                                //     matchPattern: (value) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(value) ||
                                //     "Password must be between 8 and 16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                                // }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login