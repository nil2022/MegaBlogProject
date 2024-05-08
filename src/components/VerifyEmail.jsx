import { useEffect, useState } from "react"
import authService from "../appwrite/auth"
import { useNavigate } from "react-router-dom"

function VerifyEmail() {
    const [verificationStatus, setVerificationStatus] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const verifyEmail = async () => {
        try {
            const status = await authService.updateVerification()
            if (status) {
                console.log('Email Successfully Verified')
                setVerificationStatus(true)
                alert('Please login to continue')
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        } catch (error) {
            setError(error.message)
            console.log('verifyEmail Component :: verifyEmail :: error: ', error);
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return !error ? (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg p-10 text-4xl font-bold ">
                {verificationStatus ? <h2>Verification Successful</h2> : <h2>Verifying...</h2>}
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center">
            <div className="mx-auto text-center w-full max-w-lg p-10 text-4xl font-bold">
                Invalid Verification link <br/>
                <p className="text-red-600 mt-8 text-center text-lg">{error}</p>
            </div>
        </div>
    )
}

export default VerifyEmail