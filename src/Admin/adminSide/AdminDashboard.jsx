import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="text-gray-700">This is your control panel to manage users, view analytics, and update settings.</p>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow p-4 rounded">Total Users: 120</div>
        <div className="bg-white shadow p-4 rounded">Active Vendors: 35</div>
        <div className="bg-white shadow p-4 rounded">Pending Requests: 8</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
