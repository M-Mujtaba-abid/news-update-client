// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createUserComment } from '../../redux/userSideComment/UserCommentThunk';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserComment } from "../../../redux/userSidecomment/UserCommentThunk";

// const UserPostComment = ({ postId, userId }) => {
//   const [comment, setComment] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (comment.trim() === '') return;

//     dispatch(createUserComment({ content: comment, postId, userId }));
//     setComment('');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={comment}
//           onChange={e => setComment(e.target.value)}
//           placeholder="Write a comment..."
//         />
//         <button type="submit">Post Comment</button>
//       </form>
//     </div>
//   );
// };

// export default UserPostComment;

const UserPostComment = ({ postId, userId }) => {

    // console.log(`post id = ${postId} and userId = ${userId}` )
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!comment.trim()) return;

    dispatch(createUserComment({ content: comment, postId }));
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 border border-gray-300 rounded mb-2 dark:bg-gray-800 dark:text-white"
        rows={2}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post Comment
      </button>
    </form>
  );
};
export default UserPostComment;