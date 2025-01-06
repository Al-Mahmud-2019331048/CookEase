import React, { useState } from "react";

const IngredientText = ({ ingredient }) => {
 const [isChecked, setIsChecked] = useState(false);

 const handleCheckboxChange = () => {
  setIsChecked(!isChecked);
 };

 return (
  <label className="flex items-center space-x-2">
   <input
    type="checkbox"
    id="select-checkbox"
    className="h-5 w-5 text-indigo-500 rounded"
    onChange={handleCheckboxChange}
   />
   <p
    id="selectable-text"
    className={`transition-all duration-300 ${
     isChecked ? "line-through" : ""
    }`}>
    {ingredient}
   </p>
  </label>
 );
};

export default IngredientText;
