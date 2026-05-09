import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  const isLogin = currentState === "Login";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <form onSubmit={onSubmitHandler} className="w-full max-w-[390px]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-gray-400">
            Account
          </p>

          <AnimatePresence mode="wait">
            <motion.h2
              key={currentState}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="prata-regular text-3xl text-gray-900 tracking-wide"
            >
              {currentState}
            </motion.h2>
          </AnimatePresence>

          <p className="mt-3 text-sm text-gray-500">
            {isLogin
              ? "Welcome back. Please sign in."
              : "Create your account to get started."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-4"
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:bg-white"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:bg-white"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-200 bg-white/60 px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:bg-white"
              required
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <button type="button" className="transition hover:text-black">
            Forgot password?
          </button>

          {isLogin ? (
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="rounded-lg px-2 py-1 transition hover:bg-gray-100 hover:text-black"
            >
              Create account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className="rounded-lg px-2 py-1 transition hover:bg-gray-100 hover:text-black"
            >
              Login here
            </button>
          )}
        </div>

        <button
          type="submit"
          className="mt-10 w-full rounded-lg py-3 text-sm uppercase tracking-[0.2em] text-white transition duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#A3B565" }}
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
