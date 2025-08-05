import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostThunk,
  updatePostThunk,
} from "../../redux/post/PostThunk";
import { clearPostMessages } from "../../redux/post/PostSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { state: prefillData } = useLocation();

  const { isLoading, successMessage, error } = useSelector((state) => state.post);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (postId && prefillData) {
      setIsEdit(true);
      setFormData({
        title: prefillData.title || "",
        content: prefillData.content || "",
        category: prefillData.category || "",
        image: prefillData.image || "",
      });
    }
  }, [postId, prefillData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const userId = prefillData.userId || prefillData.user?._id || "admin";
        await dispatch(updatePostThunk({ postId, userId, updateData: formData })).unwrap();
        toast.success("Post updated!");
      } else {
        await dispatch(createPostThunk(formData)).unwrap();
        toast.success("Post created!");
      }
      setTimeout(() => {
        dispatch(clearPostMessages());
        navigate("/showpost");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Failed to save post");
    }
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  }
};

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Post" : "Create Post"}
      </h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-32"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        /> */}

<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e)}
  className="w-full p-2 border rounded"
/>

        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isEdit ? "bg-yellow-600" : "bg-blue-600"
          } text-white py-2 px-4 rounded hover:opacity-90`}
        >
          {isLoading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
