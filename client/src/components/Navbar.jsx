import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Bookmark, Home, LogOut, User, Menu, X } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Notes & Bookmarks</span>
          </Link>

          {/* Mobile toggle button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/notes" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Notes</span>
            </Link>
            <Link to="/bookmarks" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 pb-4">
            <Link to="/" onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/notes" onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>Notes</span>
            </Link>
            <Link to="/bookmarks" onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </Link>
            {user ? (
              <>
                <div className="text-gray-600 flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </div>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center text-gray-600 hover:text-red-600 space-x-1">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" onClick={toggleMenu} className="btn-primary">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
