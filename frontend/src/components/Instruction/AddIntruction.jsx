import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";

const AddInstruction = ({ steps, setSteps }) => {
 const [newStep, setNewStep] = useState("");

 const addNewStep = () => {
  if (newStep.trim() !== "") {
   setSteps([...steps, newStep]);
   setNewStep("");
  }
 };

 return (
  <div className="w-full flex flex-col space-y-3 bg-white p-5 rounded-lg shadow-md">
   <p className="text-xl font-abril-fatface border-b-2 text-gray-500">
    Instructions
   </p>
   <div className="space-y-3">
    {steps.map((step, index) => (
     <div
      key={index}
      className="flex bg-gray-100 items-center space-x-2 border-dotted border-2 p-2 rounded-lg">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
       <span className="text-xl font-semibold text-gray-500">{index + 1}</span>
      </div>
      <div className="flex-1">
       <p className="text-gray-600">{step}</p>
      </div>
     </div>
    ))}
   </div>
   <textarea
    className="w-full rounded-lg bg-gray-100 text-gray-500 border-2 p-2 border-dotted focus:outline-none focus:border-gray-500"
    rows="3"
    value={newStep}
    onChange={(e) => setNewStep(e.target.value)}
   />
   <button
    className="bg-gray-100 rounded-lg p-3 m-auto font-bold text-gray-500 border-gray-500 border-2 border-dotted flex shadow-md"
    onClick={addNewStep}>
    <AddCircle className="mr-3" />
    Add Step
   </button>
  </div>
 );
};

export default AddInstruction;
