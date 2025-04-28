import React from "react";

function Fifth() {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Professional Photographer",
      feedback:
        "RipplShotAI transformed my photography business. The detailed feedback helped me refine my style and attract more clients.",
    },
    {
      name: "Michael T.",
      role: "Photography Instructor",
      feedback:
        "As a photography instructor, I recommend RipplShotAI to all my students. It's like having a professional mentor available 24/7.",
    },
    {
      name: "Elena R.",
      role: "Hobbyist Photographer",
      feedback:
        "I was stuck in a creative rut until I found RipplShotAI. The AI feedback helped me see my work from a new perspective and grow as an artist.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center pt-20 pb-20 bg-zinc-900">
      <div className="text-center mb-12">
        <h1 className="text-white font-bold text-3xl">What Our Users Say</h1>
        <p className="text-zinc-500 text-2xl mt-2">
          Photographers love RipplShotAI for transforming their work
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-xl w-80 shadow-lg"
          >
            <div className="flex mb-3">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span key={i} className="text-white text-3xl font-bold">
                    ★
                  </span>
                ))}
            </div>
            <p className="italic text-lg">"{testimonial.feedback}"</p>
            <div className="border-t border-zinc-700 mt-4 pt-2">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-zinc-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fifth;
