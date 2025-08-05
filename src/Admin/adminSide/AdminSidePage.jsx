import React from "react";
import AdminSidebar from "./AdminSidebar"; // Make sure this path is correct
import { Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDirectory from "../user/UserDirectory";
import UserDetailPage from "../user/UserDetailPage";
import CreatePost from "../post/CreatePost";
import ShowPost from "../post/ShowPost";

const AdminSidePage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Outlet />
        <Routes>
          <Route path="/" element={<AdminDashboard/>}/>
          <Route path="/userdirectory" element={<UserDirectory/>}/>
          <Route path="/userdetailpage/:id" element={<UserDetailPage/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/showpost" element={<ShowPost/>}/>
          <Route path="/edit-post/:id" element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminSidePage;
