import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white px-6 py-10  shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            Updated Pakistan is your go-to platform for the latest and most accurate news,
            bringing you updates from around the country in real-time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="/news" className="hover:text-blue-600">News Articles</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-sm">Email: <a href="mailto:info@updatedpakistan.com" className="text-blue-600 hover:underline">info@updatedpakistan.com</a></p>
        </div>
      </div>

      {/* Separator */}
      <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Social Media + Copyright */}
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">Follow us on social media</h2>
        <div className="flex justify-center gap-6 text-xl">
          <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
        </div>

        <p className="text-sm mt-4 text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Updated Pakistan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
///