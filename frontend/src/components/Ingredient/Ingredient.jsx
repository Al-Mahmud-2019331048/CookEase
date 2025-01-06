import React from "react";

import IngredientText from "./IngredientText";

const Ingredient = ({ ingredients }) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md">
   <p className="text-xl mb-4 font-abril-fatface border-b-2">Ingredients</p>
   <ul className="flex flex-col space-y-1">
    {ingredients.map((ingredient) => (
     <IngredientText
      key={ingredient.ingredient_name}
      ingredient={ingredient.ingredient_name}
     />
    ))}
   </ul>
  </div>
 );
};

export default Ingredient;
