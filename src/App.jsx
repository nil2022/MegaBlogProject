import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.auth)
  // console.log('userAuth: ', userAuth)

  useEffect(() => {
    setLoading(true)
    if (userAuth.status === true) {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }))
            setUserName(userAuth.userData)
          } else {
            dispatch(logout())
          }
        })
        .finally(() => setLoading(false))
    } else {
      dispatch(logout())
      setLoading(false)
      setUserName('')
    }

    // return () => {
    //   // setLoading(false)
    //   // dispatch(logout())
    //   if(userAuth.status === false) setUserName('')
    //   // setUserName('')
    // }
  }, [])

  console.log('username: ', userName)

  return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
      <h2 className='text-2xl font-bold text-center'>{userAuth.status === true ? ('Welcome, '+ userAuth.userData.name) : ''}</h2>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>) : null
}

export default App
