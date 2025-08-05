import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk, googleSignInThunk } from "../redux/auth/thunk/AuthThunk";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../component/firebase/Firebase";
import Loader from "../component/Loader";

const SignUp = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await dispatch(signUpThunk(payload)).unwrap();
      toast.success("Signup successful!");
      console.log(result);
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Up Handler
  const signUpWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const firebseResponse = await signInWithPopup(auth, provider);
      const user = firebseResponse.user;

      const payload = {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
      };

      await dispatch(googleSignInThunk({ users: [payload] })).unwrap();

      toast.success("Google signup successful!");
      navigate("/");
    } catch (error) {
      console.log("Google signup error: ", error);
      toast.error(error.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-6 py-12 md:px-12">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          Morning Dispatch
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Create a new account</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
          Welcome to Updated Pakistan, Please provide your details to create an
          account.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center items-center px-6 py-12 md:px-12">
        <div className="w-full max-w-md">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {loading || authLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <button
              type="button"
              className="w-full py-2 border border-gray-400 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={signUpWithGoogle}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:underline"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default SignUp;
