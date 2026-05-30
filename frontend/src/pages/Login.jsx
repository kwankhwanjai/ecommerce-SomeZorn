import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  const isLogin = currentState === "Login";

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const switchMode = () => {
    setCurrentState(isLogin ? "Sign Up" : "Login");
    resetForm();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loading) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword || (!isLogin && !cleanName)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cleanPassword.length < 8 && !isLogin) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin
        ? `${backendUrl}/api/user/login`
        : `${backendUrl}/api/user/register`;

      const payload = isLogin
        ? {
            email: cleanEmail,
            password: cleanPassword,
          }
        : {
            name: cleanName,
            email: cleanEmail,
            password: cleanPassword,
          };

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        const userToken = response.data.token;

        setToken(userToken);
        localStorage.setItem("token", userToken);

        toast.success(isLogin ? "Login successful" : "Account created");

        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <main className="flex min-h-[75vh] items-center justify-center border-t border-gray-200 px-4 py-14">
      <section className="w-full max-w-[430px] rounded-[28px] border border-gray-200 bg-white px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:px-8 sm:py-10">
        <form onSubmit={onSubmitHandler}>
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-400">
              SOMEZORN
            </p>

            <AnimatePresence mode="wait">
              <motion.h2
                key={currentState}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="prata-regular text-3xl tracking-wide text-gray-900"
              >
                {currentState}
              </motion.h2>
            </AnimatePresence>

            <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-gray-500">
              {isLogin
                ? "Sign in to continue your SomeZorn journey."
                : "Create your account to discover curated second-hand pieces."}
            </p>
          </div>

          {/* Fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="min-h-[188px] space-y-4"
            >
              {!isLogin && (
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-gray-600">
                    Full name
                  </span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                    required={!isLogin}
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-xs font-medium text-gray-600">
                  Email address
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium text-gray-600">
                  Password
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder={
                    isLogin ? "Enter your password" : "At least 8 characters"
                  }
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </label>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between gap-4 text-xs text-gray-500">
            <button
              type="button"
              disabled
              className="cursor-not-allowed opacity-45"
              title="Coming soon"
            >
              Forgot password?
            </button>

            <button
              type="button"
              onClick={switchMode}
              disabled={loading}
              className="rounded-lg px-2 py-1 font-medium transition hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLogin ? "Create account" : "Login here"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-gray-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
