// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaPlaneDeparture,
  FaHistory,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  if (!user) return null; // while redirecting

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* main card */}
      <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-md mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
            <FaUser />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Hi, {user.name || "Traveller"}
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-2 mb-1">
              <FaPlaneDeparture className="text-sky-500" />
              <span className="font-semibold text-sm">Upcoming trips</span>
            </div>
            <p className="text-xs text-slate-500">
              You don&apos;t have any upcoming trips yet.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-2 mb-1">
              <FaHistory className="text-emerald-500" />
              <span className="font-semibold text-sm">Past trips</span>
            </div>
            <p className="text-xs text-slate-500">
              Once you travel with us, your history will appear here.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-2 mb-1">
              <FaCog className="text-orange-500" />
              <span className="font-semibold text-sm">Account</span>
            </div>
            <p className="text-xs text-slate-500">
              Manage your basic account details and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Actions / menu card */}
      <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Account options</h2>
        <div className="flex flex-col gap-3 text-sm">
          <Link
            to="/search"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <FaPlaneDeparture />
              <span>Browse trips</span>
            </span>
          </Link>

          <button
            type="button"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-left"
          >
            <span className="flex items-center gap-2">
              <FaHistory />
              <span>My past trips</span>
            </span>
            <span className="text-xs text-slate-400">(coming soon)</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-left"
          >
            <span className="flex items-center gap-2">
              <FaQuestionCircle />
              <span>Help & support</span>
            </span>
            <span className="text-xs text-slate-400">
              support@traviya.com
            </span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 text-left text-red-600"
          >
            <span className="flex items-center gap-2">
              <FaSignOutAlt />
              <span>Logout</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
