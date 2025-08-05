import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
  <div className="p-4 min-h-screen bg-white dark:bg-gray-900 items-center flex justify-center">
      <section className="px-4 py-10  flex flex-col md:flex-row items-center border-2 border-green-900 rounded-tl-3xl rounded-br-3xl  shadow-lg overflow-hidden">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Want to know more about today's <span className="text-green-600">TOP 10</span> news?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Checkout these top news articles!
        </p>
        <div className="flex justify-center md:justify-start">
          <Link
            to="/"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Read Now
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src="/home.computer.jpeg"
          alt="Top News"
          className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-md shadow"
        />
      </div>
    </section>
  </div>
  );
};

export default Home;
