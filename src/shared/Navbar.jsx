import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle"; // Adjust path if needed
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/auth/thunk/AuthThunk";


const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAuthenticated , user}=useSelector((state)=> state.auth)
// console.log("isAuthenticated ye arha he ", isAuthenticated)

const handleLogout=()=>{

  dispatch(logoutThunk())
  navigate('/login')
}

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching:", search);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-4xl font-bold">
          Updated <span className="text-blue-600">Pakistan</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex text-xl space-x-6">
          <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
          <Link to="/about" className="hover:text-blue-600 hover:underline">About</Link>
          <Link to="/newsarticles" className="hover:text-blue-600 hover:underline">News Articles</Link>
        </div>

        {/* Right Icons and Buttons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 pr-10 bg-transparent"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300" />
          </form>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login/Logout Button */}
{isAuthenticated ? (
  <button
    onClick={handleLogout}
    className="px-4 py-1 border rounded-full hover:bg-red-600 hover:text-white transition-all"
  >
    Logout
  </button>
) : (
  <Link
    to="/login"
    className="px-4 py-1 border rounded-full hover:bg-blue-600 hover:text-white transition-all"
  >
    Login
  </Link>
)}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">About</Link>
          <Link to="/newsarticles" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">News Articles</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
