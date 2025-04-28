import React from "react";
import { Camera, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../features/auth/auth.thunk";

function Header({ isAuthenticated = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-black border-b border-zinc-900 w-full fixed top-0 left-0 z-50">
      <nav className="max-w-[1200px] w-full mx-auto text-white py-4 px-4 flex flex-wrap justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Camera size={24} className="text-white" />
          <span className="text-xl font-semibold">RipplShotAI</span>
          {isAuthenticated && (
            <div className="hidden md:flex gap-6 ml-6">
              <Link
                to={"/dashboard"}
                className="text-slate-200 hover:text-gray-400"
              >
                Dashboard
              </Link>
              <Link
                to={"/upload"}
                className="text-gray-500 font-medium hover:text-gray-400"
              >
                Upload
              </Link>
              <Link
                to={"/gallery"}
                className="text-gray-500 font-medium hover:text-gray-400"
              >
                Gallery
              </Link>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={"/profile"}
                className="hover:text-gray-400 hidden sm:block"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="border border-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
