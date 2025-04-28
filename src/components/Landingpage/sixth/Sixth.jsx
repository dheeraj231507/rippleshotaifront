import { MoveRight } from "lucide-react";
import React from "react";

function Sixth() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 pb-20 bg-black">
      <div className="text-center ">
        <h1 className="text-white font-bold text-3xl">
          Ready to Transform Your Photography?
        </h1>
        <p className="text-zinc-500 text-2xl mt-2 text-center">
          Join thousands of photographers who are eelevating thier craft
          <br />
          with RipplShotAI
        </p>
      </div>

      <button
        className="mt-5 bg-white px-4 py-3  flex justify-center items-center
       gap-2 rounded-md"
      >
        <span className="text-1xl font-medium">Get Started Today</span>
        <MoveRight />
      </button>
    </div>
  );
}

export default Sixth;
