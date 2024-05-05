import { useEffect, useState } from "react"
import authService from "../appwrite/auth"
import { useNavigate } from "react-router-dom"

function VerifyEmail() {
    const [verificationStatus, setVerificationStatus] = useState(false)
    const navigate = useNavigate()

    const verifyEmail = async () => {
        try {
            const status = await authService.updateVerification()
            if (status) {
                console.log('Email Successfully Verified')
                setVerificationStatus(true)
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        } catch (error) {
            console.log('verifyEmail Component :: verifyEmail :: error: ', error);
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg p-10 text-4xl font-bold ">
                {verificationStatus ? <h2>Verification Successful</h2> : <h2>Verifying...</h2>}
            </div>
        </div>
    )
}

export default VerifyEmail