"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Bookmark, Home, LogOut, User } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Notes & Bookmarks</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/notes"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Notes</span>
            </Link>

            <Link
              to="/bookmarks"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
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
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
