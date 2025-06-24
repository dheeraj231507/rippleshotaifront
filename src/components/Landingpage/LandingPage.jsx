import React from "react";
import First from "./first/First";
import Second from "./second/Second";
import Third from "./third/Third";
import Fourth from "./fourth/Fourth";
import Fifth from "./fifth/Fifth";
import Sixth from "./sixth/Sixth";
import Rights from "../RightsandReservefooter/Rights";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/Dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col overflow-y-auto pt-16">
        <First handleGetStarted={handleGetStarted} />

        <hr className="mt-32 mb-20 border-zinc-900" />

        <Second />

        <hr className="mt-32  border-zinc-900" />

        <Third />

        <hr className="  border-zinc-900" />

        <Fourth />

        <hr className="  border-zinc-900" />

        <Fifth />

        <hr className="  border-zinc-900" />

        <Sixth />

        <hr className="  border-zinc-900" />
        <Rights />
      </div>
    </>
  );
}

export default LandingPage;
