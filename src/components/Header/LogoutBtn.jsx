import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async() => {
        authService.logout()
        .then(() => {
            console.log('Logout Successfull')
            alert('Logout Successfull')
            localStorage.removeItem('userStatus')
            dispatch(logout())
            navigate('/login')
        })
        .catch((error) => {
            console.log('Server Error: ', error)
            alert('Session Expired ! Please Login Again')
            localStorage.removeItem('userStatus')
            dispatch(logout())
            navigate('/login')
        })
    }
    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn