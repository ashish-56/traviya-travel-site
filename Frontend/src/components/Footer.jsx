 // src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer({ theme }) {
  const isDark = theme === "dark";

  return (
    <footer
      className={
        isDark
          ? "mt-10 bg-slate-950 text-slate-200 py-8"
          : "mt-10 bg-slate-900 text-slate-200 py-8"
      }
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">Traviya</h2>
          <p className="text-sm mt-2 text-slate-400">
            Explore the world with comfort and safety. Customized travel
            experiences just for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-white">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white">
                Search Trips
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <FaPhone /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-300 mt-1">
            <FaEnvelope /> support@traviya.com
          </p>

          <div className="flex gap-4 text-xl mt-4">
            <a href="#" className="hover:text-orange-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500 mt-6 border-t border-slate-700 pt-4">
        © {new Date().getFullYear()} Traviya. All Rights Reserved.
      </div>
    </footer>
  );
}
