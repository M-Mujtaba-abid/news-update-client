import React from 'react';
import { useSelector } from 'react-redux';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';

const BothLayout = () => {
  const { isAdmin } = useSelector((state) => state.auth); // get isAdmin from redux
  // localStorage.getItem
console.log("isAdmin === ye arha he " ,isAdmin)
  return (
    <>
      {isAdmin ? <AdminLayout /> : <UserLayout />}
    </>
  );
};

export default BothLayout;
