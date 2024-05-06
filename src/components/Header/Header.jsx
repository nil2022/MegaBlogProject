import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  const navitems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
    {
      name: "Support",
      slug: "/contact-us",
      active: true,
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500 '>
      <Container>
        <nav className='flex flex-col sm:flex-row'>
          <div className='px-6 py-2 text-center hidden sm:block'>
            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex flex-col sm:flex-row mx-auto sm:ml-auto items-center'>
            {navitems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header