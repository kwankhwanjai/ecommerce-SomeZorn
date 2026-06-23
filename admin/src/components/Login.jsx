import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import adminImg from "../assets/img-admin.png";
import angryAdminImg from "../assets/angry-admin.png";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = ({ setToken }) => {
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [isAngry, setIsAngry] = useState(false);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const shakeTimer = useRef(null);
  const angryTimer = useRef(null);

  const triggerAngry = () => {
    setIsAngry(true);
    setShake(true);

    clearTimeout(shakeTimer.current);
    clearTimeout(angryTimer.current);

    shakeTimer.current = setTimeout(() => setShake(false), 400);
    angryTimer.current = setTimeout(() => setIsAngry(false), 3000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMove({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => {
    setMove({ x: 0, y: 0 });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);

    if (value && password) setIsAngry(false);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (email && value) setIsAngry(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!backendUrl) {
      console.error("VITE_BACKEND_URL is missing");
      triggerAngry();
      return;
    }

    if (!cleanEmail || !password || isLoading) {
      triggerAngry();
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/user/admin`,
        {
          email: cleanEmail,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      if (data?.success && data?.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
      } else {
        triggerAngry();
      }
    } catch (error) {
      console.error("Login failed");
      triggerAngry();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(shakeTimer.current);
      clearTimeout(angryTimer.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[360px]">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex justify-center mb-6 ${
            shake ? "animate-[shake_0.35s_ease-in-out]" : ""
          }`}
        >
          <img
            src={isAngry ? angryAdminImg : adminImg}
            alt="Admin"
            className="w-32 h-32 object-contain transition-all duration-200 select-none"
            draggable="false"
            style={{
              transform: `translate(${move.x}px, ${move.y}px) rotate(${
                move.x / 2
              }deg)`,
            }}
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-[30px] font-semibold text-[#504E76]">
            Admin Panel
          </h1>

          <p className="mt-2 text-sm text-[#504E76]/60">
            {isAngry ? "Hey! Complete the information first!" : "Welcome back"}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-[#504E76]">
              Email Address
            </p>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@gmail.com"
              autoComplete="email"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[#C4C3E3]/70 bg-white px-5 py-3.5 text-sm text-[#504E76] outline-none transition-all duration-300 placeholder:text-[#504E76]/35 focus:border-[#A3B565] focus:ring-4 focus:ring-[#A3B565]/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#504E76]">Password</p>

            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[#C4C3E3]/70 bg-white px-5 py-3.5 text-sm text-[#504E76] outline-none transition-all duration-300 placeholder:text-[#504E76]/35 focus:border-[#A3B565] focus:ring-4 focus:ring-[#A3B565]/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full rounded-2xl bg-[#504E76] py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#F1642E] hover:shadow-lg hover:shadow-[#F1642E]/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
