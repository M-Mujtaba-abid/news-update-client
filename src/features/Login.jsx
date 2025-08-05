import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignInThunk, signInThunk } from "../redux/auth/thunk/AuthThunk"; // Update path based on your project structure
import { app } from "../component/firebase/Firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import Loader from "../component/Loader";



const Login = () => {
  // const provider = new GoogleAuthProvider(); 
const auth=getAuth(app)
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { isLoggedIn } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/newsarticles"); // redirect after login
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(signInThunk(formData)).unwrap();
      toast.success("Login successful!");
      // console.log("result=========",result);

      // Navigate to dashboard or home
      navigate("/"); 
    } catch (error) {
      toast.error(error.message || "Login/Signup failed");
    } finally {
      setLoading(false);
    }
  };


  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    setLoading(true);
    try {
      const firebseResponse = await signInWithPopup(auth, provider);
      const user = firebseResponse.user;

      // Google user data nikaalo
      const payload = {
        email: user.email,
        displayName: user.displayName, // <-- yahan "displayName" likho
        photoUrl: user.photoURL,       // <-- yahan "photoUrl" likho
      };

      // Ab thunk dispatch karo
      await dispatch(googleSignInThunk({ users: [payload] })).unwrap();

      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.log("ye err he ", error);
      toast.error(error.message || "Google login/signup failed");
    } finally {
      setLoading(false);
    }
  };

  


  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 transition-colors">
        {/* Left side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-10 bg-white dark:bg-gray-800 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Updated Pakistan
          </h1>
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            Sign in to your account.
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Welcome back, Please provide your details
          </p>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center pt-5">
          <form
            className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

            <button
              type="button"
              onClick={signUpWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
            >
              <FaGoogle /> Continue with Google
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              If not registered?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                Go to Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
