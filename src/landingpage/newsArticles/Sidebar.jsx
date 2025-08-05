

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPostsThunk, sortPostsThunk, filterPostsByCategoryThunk, filterPostsThunk } from '../../redux/userSidePost/UserPostThunk';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  // ✅ Apply all filters together
  const applyFilters = () => {
    dispatch(filterPostsThunk({ category, searchTerm, sort }));
  };

  // ✅ Search only
  const handleSearch = () => {
    if (searchTerm) dispatch(searchPostsThunk(searchTerm));
  };

  // ✅ Sort only
  const handleSort = (e) => {
    const value = e.target.value === 'Latest' ? 'desc' : 'asc';
    setSort(value);
    dispatch(sortPostsThunk(value));
  };

  // ✅ Category only
  const handleCategory = (e) => {
    setCategory(e.target.value);
    dispatch(filterPostsByCategoryThunk(e.target.value));
  };

  return (
    <div className="w-full md:w-1/4 p-4 border-r  border-gray-300 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Filters</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Search Term:
        </label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Sort By:
        </label>
        <select
          value={sort}
          onChange={handleSort}
          className="w-full p-2 border border-gray-400 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="">-- Select --</option>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Category:
        </label>
        <select
          value={category}
          onChange={handleCategory}
          className="w-full p-2 border border-gray-400 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a Category</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Apply All Filters
      </button>
    </div>
  );
};

export default Sidebar;
// 