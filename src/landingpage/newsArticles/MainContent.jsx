

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginatePostsThunk } from '../../redux/userSidePost/UserPostThunk';
import ShowUserComment from '../newsArticles/usersComments/ShowUserComment';
import UserPostComment from '../newsArticles/usersComments/UserPostComment';
import { FaHeart, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import { FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';

const MainContent = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.userPosts);
  const userId = useSelector((state) => state.auth.user?._id);
  const [startIndex, setStartIndex] = useState(0);
  const [activePostId, setActivePostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const limit = 5;


// try------------
const { singleUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (singleUser) {
      // localStorage.setItem("singleUser", JSON.stringify(singleUser));

      // console.log("geo ====>", JSON.stringify(singleUser.username, null, 2));

    }
  }, [singleUser]);
  
  const userFromStorage = JSON.parse(localStorage.getItem("singleUser"));

// console.log("User from localStorage:", userFromStorage.username);


// try------------
useEffect(() => {
    dispatch(paginatePostsThunk({ startIndex, limit }));
  }, [dispatch, startIndex]);

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    // Here you would dispatch your like action
  };

  return (
    <div className="w-full md:w-3/4 p-2 md:p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-4">News Feed</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 p-4">{error}</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Post Header */}
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img 
                  src={ 'https://via.placeholder.com/40'} 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {userFromStorage?.username || 'Anonymoussssssssssss'}</h4>
                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <button className="ml-auto text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaEllipsisH />
              </button>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  
                  className="w-full rounded-lg object-cover max-h-96"
                />
              )}
            </div>

            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <span className="bg-blue-500 text-white rounded-full p-1 mr-1">
                    <FaHeart size={10} />
                  </span>
                  <span>{post.likes?.length || 0}</span>
                </div>
                <span>{post.comments?.length || 0} comments</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex justify-between px-4 py-2 text-gray-500 dark:text-gray-400">
              <button 
                onClick={() => handleLike(post._id)}
                className={`flex items-center justify-center w-1/3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${likedPosts[post._id] ? 'text-red-500' : ''}`}
              >
                {likedPosts[post._id] ? (
                  <FaHeart className="mr-2" />
                ) : (
                  <FiHeart className="mr-2" />
                )}
                <span>Like</span>
              </button>
              
              <button 
                onClick={() => setActivePostId(post._id)}
                className="flex items-center justify-center w-1/3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiMessageSquare className="mr-2" />
                <span>Comment</span>
              </button>
              
              <button className="flex items-center justify-center w-1/3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiShare2 className="mr-2" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments Modal */}
            {activePostId === post._id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Comments</h3>
                    <button
                      onClick={() => setActivePostId(null)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4">
                    <ShowUserComment postId={post._id} />
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <UserPostComment postId={post._id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
          <p>No posts found. Be the first to share something!</p>
        </div>
      )}

      {/* Pagination - Only show on desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-6">
        <button
          onClick={() => setStartIndex((prev) => Math.max(prev - limit, 0))}
          disabled={startIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setStartIndex((prev) => prev + limit)}
          disabled={posts.length < limit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Mobile floating action button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button 
          onClick={() => setStartIndex(prev => prev + limit)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MainContent;