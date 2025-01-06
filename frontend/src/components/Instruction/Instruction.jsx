import React from "react";

const Instruction = ({ steps }) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md">
   <h2 className="text-xl mb-4 font-abril-fatface border-b-2">Instructions</h2>
   <div className="space-y-5">
    {steps.map((step, index) => (
     <div key={index} className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
       <span className="text-xl font-semibold">{step.step_number}</span>
      </div>
      <div className="flex-1">
       <p className="text-gray-600">{step.step_description}</p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default Instruction;
