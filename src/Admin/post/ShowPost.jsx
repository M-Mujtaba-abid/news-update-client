// // src/pages/ShowPost.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPostsThunk } from "../../redux/post/PostThunk";

// const ShowPost = () => {
//   const dispatch = useDispatch();

//   const { posts, isLoading, error } = useSelector((state) => state.post);

//   useEffect(() => {
//     dispatch(getPostsThunk({ category: "", limit: 10 }));
//   }, [dispatch]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">All Posts</h2>

//       {isLoading && <p>Loading posts...</p>}
//       {error && <p className="text-red-600">Error: {error}</p>}
//       {posts.length === 0 && !isLoading && <p>No posts found.</p>}

//       <div className="grid gap-4">
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
//           >
//             <h3 className="text-xl font-semibold">{post.title}</h3>
//             <p className="text-gray-700 mt-1">{post.content}</p>
//             <p className="text-sm text-gray-500 mt-2">Category: {post.category}</p>
//             {post.image && (
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="mt-3 w-full max-h-60 object-cover rounded"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowPost;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, getPostsThunk } from "../../redux/post/PostThunk";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";

const ShowPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsThunk({ category: "", limit: 10 }));
  }, [dispatch]);

  const handleEdit = (post) => {
    navigate(`/edit-post/${post._id}`, { state: post });
  };

  const handleDelete = async (postId, userId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
      try {
        await dispatch(deletePostThunk({ postId, userId })).unwrap();
        toast.success("Post deleted!");
        dispatch(getPostsThunk({ category: "", limit: 10 }));
      } catch (err) {
        toast.error(err.message || "Failed to delete post");
      }
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.length === 0 && !isLoading && <p>No posts found.</p>}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700 mt-1">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">Category: {post.category}</p>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="mt-3 w-full max-h-60 object-cover rounded"
              />
            )}
            <button
              onClick={() => handleEdit(post)}
              className="mt-4 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            {/* <br /> */}
            <button
              onClick={() => handleDelete(post._id, post.userId || post.user?._id || "admin")}
              className="bg-red-600 ml-5 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPost;
