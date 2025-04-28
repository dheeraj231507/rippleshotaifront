import React from "react";

function Fourth() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 pb-20 bg-black">
      <div className="text-center mb-12">
        <h1 className="text-white font-bold text-3xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-500 text-2xl mt-2">
          Choose the plan that works for your photography needs
        </p>
      </div>

      <div className="flex-row md:flex justify-center gap-8 w-full max-w-6xl">
        {/* Starter Plan */}
        <div className="border border-gray-900 rounded-xl p-8 w-full max-w-sm relative">
          <div className="flex flex-col h-full">
            <h2 className="text-white text-2xl font-bold">Starter</h2>
            <p className="text-zinc-400 mt-2">
              Perfect for beginners and hobbyists
            </p>
            <div className="my-6">
              <span className="text-white text-4xl font-bold">$9</span>
              <span className="text-zinc-400 text-xl"> /month</span>
            </div>
            <ul className="flex-grow space-y-3">
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                20 photo reviews per month
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Basic composition analysis
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                7-day history
              </li>
            </ul>
            <button className="mt-8 w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className=" rounded-xl p-8 w-full max-w-sm relative border-2 border-white">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm font-medium px-4 py-1 rounded-full">
            Most Popular
          </div>
          <div className="flex flex-col h-full">
            <h2 className="text-white text-2xl font-bold">Pro</h2>
            <p className="text-zinc-400 mt-2">For serious photographers</p>
            <div className="my-6">
              <span className="text-white text-4xl font-bold">$19</span>
              <span className="text-zinc-400 text-xl"> /month</span>
            </div>
            <ul className="flex-grow space-y-3">
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                100 photo reviews per month
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Advanced composition analysis
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Style recommendations
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                30-day history
              </li>
            </ul>
            <button className="mt-8 w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-white transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Expert Plan */}
        <div className="border border-gray-900 rounded-xl p-8 w-full max-w-sm relative">
          <div className="flex flex-col h-full">
            <h2 className="text-white text-2xl font-bold">Expert</h2>
            <p className="text-zinc-400 mt-2">For professional photographers</p>
            <div className="my-6">
              <span className="text-white text-4xl font-bold">$39</span>
              <span className="text-zinc-400 text-xl"> /month</span>
            </div>
            <ul className="flex-grow space-y-3">
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Unlimited photo reviews
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Premium detailed analysis
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Portfolio consistency check
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Unlimited history
              </li>
              <li className="flex items-center text-zinc-300">
                <span className="text-white mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <button className="mt-8 w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fourth;
