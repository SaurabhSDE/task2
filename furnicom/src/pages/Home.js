import React from "react";
import Sliders from "../components/Slider";
import Category from "../components/Category";
import Arrival from "../components/Arrival";

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <Sliders />
        <Category />
        <Arrival />    
      </div>
    </>
  );
}
