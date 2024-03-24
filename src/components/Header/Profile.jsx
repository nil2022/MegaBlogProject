import { useEffect } from "react"
import { useSelector } from "react-redux"

function ProfileBtn() {

  useEffect(() => {

    console.log('Loaded Profile.jsx')

    return () => {
      // console.clear();
    }
  }, [])

  const authSlice = useSelector((state) => state.auth.userData)
  // console.log('authSlice: (in ProfileBtn component): ', authSlice)
  
  return authSlice ? (
    <div className="w-full items-center">
      <h1 className="text-2xl font-[600] text-center ">User Details:</h1>
      <div className="flex-flex-wrap ">
      <p className="text-xl font-semibold">Name: {authSlice.name}</p>
      <p className="text-xl font-semibold">Email: {authSlice.email}</p>
      </div>
    </div>
  ) : null
}

export default ProfileBtn