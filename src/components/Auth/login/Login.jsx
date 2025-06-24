import { useEffect, useState } from "react";
import { Camera, Loader } from "lucide-react";
import Header from "../../Common/Header";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../../features/auth/auth.thunk";

import { useLocation, useNavigate } from "react-router-dom";
import { clearError } from "../../../features/auth/auth.slice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isButtonLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    dispatch(clearError()); // Clear error when component mounts
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk(formData));
    if (result.payload?.success) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Header isAuthenticated={false} />

      <div className="flex justify-center items-center min-h-screen bg-black px-4">
        <div className="border border-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
          <div className="flex flex-col items-center text-center">
            <Camera className="w-10 h-10 text-gray-400 text-center" />
            <h2 className="text-xl font-semibold mt-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter credentials to access your account
            </p>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium mt-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.email}
              required
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium mt-3"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.password}
              required
            />

            <p className="text-right text-sm sm:text-base text-gray-400 mt-4 mb-2">
              Forget password?
            </p>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold p-2 rounded mt-4 hover:bg-gray-300 transition flex justify-center items-center"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <Loader className="h-5 w-5 animate-spin" /> // Show spinning loader icon
              ) : (
                "Login" // Show text when not loading
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
