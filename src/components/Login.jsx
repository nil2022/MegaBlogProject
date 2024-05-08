import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
import { BackgroundGradient } from './ui/background-gradient'

const redirectUrlAfterVerification = import.meta.env.VITE_EMAILVERIFICATION_URL

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, getValues } = useForm()
    const [error, setError] = useState("")
    const [loginData, setLoginData] = useState()
    const [userIsVerified, setUserIsVerified] = useState(true)  

    // const authSlice = useSelector((state) => state.auth)
    // console.log('authSlice: (in Login component(in components/Login.jsx)) ', authSlice)

    // console.log('getValues: ', getValues())

    /** FUNCTION TO LOGIN USER */
    const login = async (data) => {
        setLoginData(data);
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                console.log('Login Successfull !')
                const userData = await authService.getCurrentUser()
                localStorage.setItem('userVerified', JSON.stringify(userData.emailVerification))
                if (userData.emailVerification) {
                    setUserIsVerified(true)
                    await authService.setUserPreferences(userData)
                    // const userPreferences = await authService.getUserPreferences()
                    // console.log('User preferences: (in Login component(in components/Login.jsx)) ', userPreferences)
                    // console.log('userData: (in Login component(in components/Login.jsx)) ', userData)
                    localStorage.setItem('userStatus', JSON.stringify(true))
                    dispatch(authLogin({ userData }))
                    navigate("/")
                } else {
                    await authService.logout()
                    throw new Error('Email not verified!')
                }
                alert('Login Successfull !')
            }
        } catch (error) {
            setError(error.message)
            console.log('Login error: ', error)
        }
    }

    /** FUNCTION TO RE-SEND VERIFICATION MAIL TO USER'S EMAIL ADDRESS */
    const resendVerificationEmail = async () => {
        setError("")
        try {
            if(loginData === undefined) {
                alert('Please provide your Email and password')
                throw new Error('Email and password are required to send verification link')
            }
            await authService.login(loginData)
            const response = await authService.verifyEmail(redirectUrlAfterVerification)
            if (response) {
                console.log('Verification email sent successfully!')
                await authService.logout();
                alert('Verification email sent successfully!')
            }
        } catch (error) {
            setError(error.message)
            console.log('resendVerificationEmail :: error: ', error);
        }
    }

    useEffect(() => {
        // console.log('userIsVerified: ', userIsVerified)
        return () => {
            localStorage.removeItem('userVerified')
        }
    }, [userIsVerified])

    return (
        <div
            className='flex items-center justify-center w-full '>
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-800"
            >
                <div className='mx-auto w-full max-w-lg rounded-xl sm:p-10 text-white'>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base ">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 mx-auto text-center justify-center max-w-[280px]">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5'>
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
                            <Input
                                label="Password: "
                                placeholder="Your Password"
                                type="password"
                                {...register("password", {
                                    required: true,
                                    // validate: {
                                    //     matchPattern: (value) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(value) ||
                                    //     "Password must be between 8 and 16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                                    // }
                                })}
                                className="w-full bg-gray-700 hover:ring-2 hover:ring-violet-300 placeholder:text-slate-400"
                            />
                            <Button
                                type="submit"
                                className="w-full">
                                Sign In
                            </Button>
                        </div>
                    </form>
                    {localStorage.getItem('userVerified') && (<div className='text-center mt-4'>
                        Email not verified ? <br />
                        <button
                            onClick={() => resendVerificationEmail()}
                            className='text-primary hover:underline hover:scale-105 transition-all duration-300'
                        >
                            Click Here to Send Verification Link
                        </button>
                    </div>)}
                    <div className='text-center mt-4'>
                        If you face any issue, please click on Support Tab.
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    )
}

export default Login