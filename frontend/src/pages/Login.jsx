import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import bgImg from "../assets/note-3d-bg-yellow.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    user.isLoggedIn && navigate("/");
  }, [user, navigate]);
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
      className="min-h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center"
    >
      <form className="flex rounded-lg shadow-lg mx-auto w-full max-w-sm lg:max-w-md p-8 sm:p-10">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Notes
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <button className="w-full flex items-center justify-center mt-4 rounded-lg bg-white/60 hover:bg-white/80 py-3">
            <FcGoogle className="text-2xl" />
            <span className="text-gray-600 font-semibold">
              Sign in with Google
            </span>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4" />
            <Link to="" className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </Link>
            <span className="border-b w-1/5 lg:w-1/4" />
          </div>
          <div className="mt-4">
            <label className="form-input-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="form-input-label">Password</label>
              <Link to="" className="text-xs text-gray-500">
                Forget Password?
              </Link>
            </div>
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-8">
            <button
              type="button"
              className="btn"
              onClick={() => login(inputValues)}
            >
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link to="/signup" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </form>
    </div>
  );
};
