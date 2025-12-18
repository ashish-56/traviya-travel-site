// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onAuth }) {
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
        `${api}/api/auth/login`,
        { email, password },
        { withCredentials: true } // ⭐ REQUIRED FOR REFRESH TOKEN COOKIE
      );

      // 🔹 BACKEND RETURNS accessToken, NOT token
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;

      if (!accessToken) {
        console.warn("Login response:", res.data);
        alert("Login failed: no access token returned");
        return;
      }

      // 🔹 Store access token (short lived)
      localStorage.setItem("token", accessToken);

      // 🔹 Store user info
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (onAuth) onAuth(user);
      }

      // 🔹 Redirect after login
      navigate("/");
    } catch (err) {
      console.error("Login error:", err?.response?.data || err.message);
      alert(err?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-6 rounded-xl shadow text-slate-900">
        <h2 className="text-2xl font-bold mb-1">Login</h2>
        <p className="text-sm text-slate-500 mb-4">Welcome back</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded text-slate-900 placeholder:text-slate-400"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded text-slate-900 placeholder:text-slate-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white p-3 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
