// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ onAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await axios.post(
        `${api}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true } // ⭐ REQUIRED
      );

      // 🔹 Backend returns accessToken
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;

      if (!accessToken) {
        console.warn("Signup response:", res.data);
        alert("Signup failed: no access token returned");
        return;
      }

      // 🔹 Store access token
      localStorage.setItem("token", accessToken);

      // 🔹 Store user info
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (onAuth) onAuth(user);
      }

      // 🔹 Redirect after signup
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err?.response?.data || err.message);
      alert(err?.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-xl shadow text-slate-900">
          <h1 className="text-xl font-bold mb-1">Create account</h1>
          <p className="text-sm text-slate-500 mb-4">Join Traviya</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full p-3 border rounded text-slate-900 placeholder:text-slate-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border rounded text-slate-900 placeholder:text-slate-400"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password (min 6 chars)"
              required
              minLength={6}
              className="w-full p-3 border rounded text-slate-900 placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white p-3 rounded font-semibold disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="text-sm text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
