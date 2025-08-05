import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logoutThunk } from "../../redux/auth/thunk/AuthThunk";
import { useDispatch } from "react-redux";

const AdminSidebar = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
  const handleLogout=()=>{
  
    dispatch(logoutThunk())
    navigate('/login')
  }
  


  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold px-6 py-4 border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="mt-4 flex flex-col gap-2 px-4">
          <Link
            to="/userdirectory"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            <FaUser />
            Users
          </Link>
          <Link
            to="/createpost"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            <FaChartBar />
            createpost
          </Link>
          <Link
            to="/showpost"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            <FaCog />
            ShowPost
          </Link>
        </nav>
      </div>

      <div className="px-4 py-4 border-t border-gray-700">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
