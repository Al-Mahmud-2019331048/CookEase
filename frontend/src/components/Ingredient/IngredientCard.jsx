import React from "react";

const IngredientCard = ({ items }) => {
 return (
  <>
   {items.map((item) => (
    <div className="text-center p-2 border border-dashed border-gray-400 text-gray-500 rounded-lg shadow-md">{item}</div>
   ))}
  </>
 );
};

export default IngredientCard;
