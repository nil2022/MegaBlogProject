import { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navitems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
    { name: "Support", slug: "/contact-us", active: true },
  ];

  return (
    <header className="bg-gray-800 text-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="50px" />
          </Link>

          {/* Hamburger icon */}
          <button
            className="sm:hidden text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Nav items */}
          <ul
            className={`flex-col sm:flex-row sm:flex gap-4 items-center sm:static fixed bg-gray-800 left-0 top-16 w-full sm:w-auto px-6 sm:px-0 py-4 sm:py-0 transition-all duration-300 ease-in-out
  ${mobileMenuOpen ? "flex z-50" : "hidden sm:flex"}`}
          >
            {navitems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMobileMenuOpen(false);
                      }}
                      className="hover:text-gray-300 px-3 py-2 text-sm sm:text-base"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
