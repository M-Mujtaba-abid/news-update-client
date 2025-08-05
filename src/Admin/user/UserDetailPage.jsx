import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserThunk, deleteUserThunk, updateUserThunk } from "../../redux/user/UserThunk";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";

const UserDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleUser, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (singleUser) {
      localStorage.setItem("singleUser", JSON.stringify(singleUser));
      console.log("geo ====>", JSON.stringify(singleUser.username, null, 2));
    }
  }, [singleUser]);



  // Modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleUserThunk(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleUser) {
      setEditData({
        username: singleUser.username,
        email: singleUser.email,
        isAdmin: singleUser.isAdmin,
      });
    }
  }, [singleUser]);

  // Edit handler
  const handleEdit = () => setShowEdit(true);

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // toast("successfully Edit")
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      username: editData.username,
      email: editData.email,
      isAdmin: editData.isAdmin,
    };
    const result = await dispatch(updateUserThunk({ userId: id, updateData }));
    if (updateUserThunk.fulfilled.match(result)) {
      toast.success("User updated!");
      dispatch(getSingleUserThunk(id));
      setShowEdit(false);
    } else {
      toast.error(result.payload || "Failed to update user");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    const result = await dispatch(deleteUserThunk(id));
    toast("successfully deleted")
    if (deleteUserThunk.fulfilled.match(result)) {
      navigate("/userdirectory");
    } else {
      toast("Failed to delete user");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!singleUser) return <p className="p-4">No user found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <img
        src={singleUser.profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl text-center font-semibold">{singleUser.username}</h2>
      <p className="text-center text-gray-600">{singleUser.email}</p>
      <div className="mt-4 space-y-1">
        <p><strong>Role:</strong> {singleUser.isAdmin ? "Admin" : "User"}</p>
        <p><strong>Created At:</strong> {new Date(singleUser.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(singleUser.updatedAt).toLocaleString()}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow space-y-4 min-w-[300px]"
          >
            <h3 className="text-lg font-bold mb-2">Edit User</h3>
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleEditChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Email"
              required
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAdmin"
                checked={editData.isAdmin}
                onChange={handleEditChange}
              />
              Is Admin
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;



