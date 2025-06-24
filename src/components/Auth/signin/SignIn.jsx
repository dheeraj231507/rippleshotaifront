import { useState } from "react";
import { Camera, Loader } from "lucide-react"; // Import Loader
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import Header from "../../Common/Header";
import { registerUserThunk } from "../../../features/auth/auth.thunk";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate(); // Initialize useNavigate
  const isButtonLoading = useSelector((state) => state.auth.isButtonLoading); // Get isButtonLoading from Redux

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Validate all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Create plain object with user data
    const userData = {
      name,
      email,
      password,
    };

    try {
      const result = await dispatch(registerUserThunk(userData));
      if (result.payload?.success) {
        navigate("/login"); // Navigate to dashboard on success
      } else if (result.payload) {
        alert(result.payload); // Show specific error message
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An unexpected error occurred. Please try again.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <Header isAuthenticated={false} />

      <div className="flex justify-center items-center pt-32 sm:pt-24 md:pt-32 px-4">
        <div className="border border-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
          <div className="flex flex-col items-center text-center">
            <Camera className="w-10 h-10 text-gray-400 text-center" />
            <h2 className="text-xl font-semibold mt-2">Create an account</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter your information to get started with RipplShotAI
            </p>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name} // Bind value to formData
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="block text-sm font-medium mt-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email} // Bind value to formData
              onChange={handleChange}
              required
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium mt-3"
            >
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password} // Bind value to formData
              onChange={handleChange}
              required
            />

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mt-3"
            >
              Confirm Password
            </label>
            <input
              autoComplete="off"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-2 mt-1 rounded bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPassword} // Bind value to formData
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold p-2 rounded mt-4 hover:bg-gray-300 transition flex justify-center items-center"
              disabled={isButtonLoading} // Disable the button while loading
            >
              {isButtonLoading ? (
                <Loader className="h-5 w-5 animate-spin" /> // Show spinning loader icon
              ) : (
                "Create account" // Show text when not loading
              )}
            </button>
          </form>

          <p className="text-center text-gray-100 text-sm mt-3">
            Already have an account?{" "}
            <Link
              to="/login" // Use Link for navigation
              className="text-gray-200 underline decoration-2 underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
