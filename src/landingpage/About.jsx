import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
      <div className="p-4 min-h-screen bg-white dark:bg-gray-900 items-center flex justify-center">
        <section className="pl-12 py-10  flex flex-col md:flex-row items-center  shadow-lg   overflow-hidden">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6 text-center md:text-left">
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Who We Are
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We are a passionate team committed to driving change through innovation and collaboration. Our platform is designed to empower individuals and organizations to unlock their true potential.
        </p>
        <div className="flex justify-center md:justify-start">
          {/* <Link
            to="/news"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Read Now
          </Link> */}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 m-2 flex justify-center">
  <img
    src="/home.computer.jpeg"
    alt="Top News"
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-l h-auto object-cover rounded-md shadow"
  />
</div>

    </section>
      
    </div>
  )
}

export default About
