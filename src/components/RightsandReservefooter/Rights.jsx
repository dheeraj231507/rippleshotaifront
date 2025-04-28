import React from "react";

function Rights() {
  return (
    <div className="bg-black text-zinc-500 text-sm py-4 px-6 md:px-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
      {/* Copyright Notice */}
      <p className="text-center md:text-left">
        © 2025 RipplShotAI. All rights reserved.
      </p>

      {/* Terms & Privacy Links */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="#" className="hover:text-white transition-colors duration-200">
          Terms
        </a>
        <a href="#" className="hover:text-white transition-colors duration-200">
          Privacy
        </a>
      </div>
    </div>
  );
}

export default Rights;
