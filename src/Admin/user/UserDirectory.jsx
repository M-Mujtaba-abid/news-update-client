// // src/components/UserDirectory.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersThunk, deleteUserThunk } from "../../redux/user/UserThunk";

// const UserDirectory = () => {
//   const dispatch = useDispatch();
//   const { users, isLoading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchUsersThunk());
//   }, [dispatch]);

//   const handleDelete = (userId) => {
//     dispatch(deleteUserThunk(userId));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">User Directory</h2>
//       {isLoading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       <ul className="space-y-2">
//         {users.map((user) => (
//           <li key={user._id} className="flex justify-between items-center border p-2 rounded shadow">
//             <div>
//               <p><strong>Username:</strong> {user.username}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//             </div>
//             <button
//               onClick={() => handleDelete(user._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserDirectory;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk, deleteUserThunk } from "../../redux/user/UserThunk";
import { Eye } from "lucide-react"; // or use react-icons
import { Link } from "react-router-dom";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";

const UserDirectory = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">User Directory</h2>
      <table className="min-w-full border border-gray-200 rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4 border-b">Profile</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Admin</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isAdmin ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "Client"}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
          <Link  to={`/userdetailpage/${user._id}`} className="text-blue-600 hover:underline flex items-center gap-1">
  <Eye size={16} />
  View
</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Toaster use karo jab delete ya fetch fail ho
const handleDelete = async (userId) => {
  try {
    await dispatch(deleteUserThunk(userId)).unwrap();
    toast.success("User deleted!");
    dispatch(fetchUsersThunk());
  } catch (error) {
    toast.error(error.message || "Failed to delete user");
  }
};

export default UserDirectory;
