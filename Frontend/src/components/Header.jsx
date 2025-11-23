// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/Logo.png"
export default function Header({ user, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header
      className={
        isDark
          ? "sticky top-0 z-30 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800"
          : "sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo} // change if your logo path is different
            alt="Traviya"
            className="h-10 w-10 rounded-md object-cover shadow-sm"
          />
          <div>
            <div className="font-bold text-lg tracking-tight">
              Traviya
            </div>
            <div className="text-sm text-slate-500">
              Book your next adventure
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-slate-700">
            Home
          </Link>

          {/* Show Login & Signup only when NOT logged in */}
          {!user && (
            <>
              <Link to="/login" className="px-4 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
              >
                Signup
              </Link>
            </>
          )}

          {/* Show profile avatar when logged in */}
          {user && (
            <Link
              to="/profile"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-sky-600 text-white font-bold cursor-pointer hover:bg-sky-700 transition"
            >
              {user.name?.charAt(0).toUpperCase()}
            </Link>
          )}

          {/* theme toggle button */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs transition 
      ${
        isDark
          ? "border-slate-600 bg-slate-800 hover:bg-slate-700"
          : "border-slate-200 bg-white hover:bg-slate-100"
      }`}
          >
            {isDark ? <FaSun /> : <FaMoon />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
