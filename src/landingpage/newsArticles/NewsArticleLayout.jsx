import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const NewsArticleLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      
      <Sidebar />
      
      <MainContent />
    </div>
  );
};

export default NewsArticleLayout;
