import React from "react";

const Description = ({ text }) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md">
   <h2 className="text-xl mb-4 font-abril-fatface border-b-2">Description</h2>
   <p>{text}</p>
  </div>
 );
};

export default Description;
