import React, { useState } from "react";
import IngredientCard from "./IngredientCard";

const AddIngredient = ({items,setItems}) => {
 const [item, setItem] = useState("");
 const handleSubmit = (e) => {
  e.preventDefault();
  setItems([...items, item]);
  setItem("");
 };
 const handleChange = (e) => {
  e.preventDefault();
  setItem(e.target.value);
 };
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md">
   <p className="text-xl mb-4 font-abril-fatface border-b-2 text-gray-500">
    Ingredients
   </p>
   <div className="grid grid-cols-4 gap-4">
    <IngredientCard items={items} />
    <form onSubmit={handleSubmit}>
     <input
      className="p-2 border text-center border-dashed border-gray-200 text-gray-400 rounded-lg shadow-md focus:outline-none focus:border-gray-500 w-full"
      type="text"
      placeholder="Ingredient..."
      value={item}
      onChange={handleChange}
     />
    </form>
   </div>
  </div>
 );
};

export default AddIngredient;
