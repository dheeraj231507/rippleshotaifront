import { Camera } from "lucide-react";

const Auth = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <Camera className="w-6 h-6 text-gray-400" />
        <span className="text-lg font-semibold ">RipplShotAI</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white hidden sm:block">
          Log In
        </button>
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 transition text-sm sm:text-base">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Auth;
