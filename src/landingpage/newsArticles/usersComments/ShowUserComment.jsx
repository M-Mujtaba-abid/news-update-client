

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getPostComments,
//   likeComment,
// deleteComment,
// editComment,
// } from "../../../redux/userSidecomment/UserCommentThunk";

// const ShowUserComment = ({ postId }) => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.auth.user);
//   const comments = useSelector((state) => state.userComment.comments || []);
//   const loading = useSelector((state) => state.userComment.loading);
//   const error = useSelector((state) => state.userComment.error);

//   const [editCommentId, setEditCommentId] = useState(null);
//   const [editedContent, setEditedContent] = useState("");

//   const handleEdit = (commentId, content) => {
//   setEditCommentId(commentId);
//   setEditedContent(content);
// };

// const handleEditSubmit = () => {
//   if (editedContent.trim() && editCommentId) {
//     dispatch(editComment({ commentId: editCommentId, content: editedContent }));
//     setEditCommentId(null);
//     setEditedContent("");
//   }
// };


//   useEffect(() => {
//     if (postId) {
//       dispatch(getPostComments(postId));
//     }
//   }, [dispatch, postId]);

//   const handleLike = (commentId) => {
//     console.log("loooook ",commentId)
//     // if (!currentUser?._id) {
//     // //   alert("Please login to like comments");
//     //   return;
//     // }
// dispatch(likeComment({ commentId }));
//   };

//   const handleDelete = (commentId) => {
//   if (!window.confirm("Are you sure you want to delete this comment?")) return;
//   dispatch(deleteComment(commentId));
// };

//   if (loading) return <p>Loading comments...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="mt-6">
//       {Array.isArray(comments) && comments.length > 0 ? (
//         comments.map((comment) => {
//           if (!comment?._id) return null;
          
//           const isLiked = comment.likes?.includes(currentUser?._id);
          
//           return (
//             <div
//               key={comment._id}
//               className="border-b py-2 text-gray-800 dark:text-gray-200"
//             >
//               <div className="flex justify-between items-center">
//                 <p>{comment.content || "No content"}</p>
//                 <button
//                   onClick={() => handleLike(comment._id)}
//                   className={`text-sm ${isLiked ? 'text-red-500' : 'text-blue-500'} hover:underline`}
//                 >
//                   ❤️ {comment.likes?.length || comment.numberOfLikes || 0}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">
//                 by {comment.user?.username || currentUser?.username || "Anonymous"}
//               </p>
//               <div className="flex items-center justify-end mt-1">
//   <button
//     onClick={() => handleDelete(comment._id)}
//     className="text-xs text-red-500 hover:underline flex items-center gap-1"
//     title="Delete Comment"
//   >
//     🗑️ 
//   </button>
// </div>

//             </div>
//           );
//         })
//       ) : (
//         <p className="text-gray-500">No comments found.</p>
//       )}
//     </div>
//   );
// };

// export default ShowUserComment;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostComments,
  likeComment,
  deleteComment,
  editComment,
} from "../../../redux/userSidecomment/UserCommentThunk";

const ShowUserComment = ({ postId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.userComment.comments || []);
  const loading = useSelector((state) => state.userComment.loading);
  const error = useSelector((state) => state.userComment.error);

  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (postId) {
      dispatch(getPostComments(postId));
    }
  }, [dispatch, postId]);

  const handleLike = (commentId) => {
    dispatch(likeComment({ commentId }));
  };

  const handleDelete = (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    dispatch(deleteComment(commentId));
  };

  const handleEdit = (commentId, content) => {
    setEditCommentId(commentId);
    setEditedContent(content);
  };

  const handleEditSubmit = () => {
    if (editedContent.trim() && editCommentId) {
      dispatch(editComment({ commentId: editCommentId, content: editedContent }));
      setEditCommentId(null);
      setEditedContent("");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => {
          if (!comment?._id) return null;

          const isLiked = comment.likes?.includes(currentUser?._id);
          const isOwner = currentUser?._id === comment.user?._id;

          return (
            <div
              key={comment._id}
              className="border-b py-2 text-gray-800 dark:text-gray-200"
            >
              {/* If comment is in edit mode */}
              {editCommentId === comment._id ? (
                <div className="flex flex-col gap-1 w-full">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="text-sm p-1 border rounded dark:bg-gray-800 dark:text-white"
                    rows={2}
                  />
                  <div className="flex items-center gap-2 mt-1 justify-end">
                    <button
                      onClick={handleEditSubmit}
                      className="text-green-600 text-xs hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditCommentId(null);
                        setEditedContent("");
                      }}
                      className="text-gray-500 text-xs hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <p>{comment.content || "No content"}</p>
                    <button
                      onClick={() => handleLike(comment._id)}
                      className={`text-sm ${isLiked ? 'text-red-500' : 'text-blue-500'} hover:underline`}
                    >
                      ❤️ {comment.likes?.length || comment.numberOfLikes || 0}
                    </button>
                  </div>
                </>
              )}

              <p className="text-xs text-gray-500">
                by {comment.user?.username || currentUser?.username || "Anonymous"}
              </p>

              {/* Edit/Delete buttons (only if user owns the comment) */}
              {isOwner && (
                <div className="flex items-center justify-end gap-3 mt-1">
                  <button
                    onClick={() => handleEdit(comment._id, comment.content)}
                    className="text-xs text-yellow-500 hover:underline"
                    title="Edit Comment"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-xs text-red-500 hover:underline"
                    title="Delete Comment"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No comments found.</p>
      )}
    </div>
  );
};

export default ShowUserComment;
