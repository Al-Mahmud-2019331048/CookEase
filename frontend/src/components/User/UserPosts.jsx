import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Home/RecipeCard";
import { Tag } from "@mui/icons-material";

const UserPosts = ({ user }) => {
 //  const recipes = [
 //   {
 //    title: "Tofu Curry",
 //    image: "https://i.ibb.co/ZdP6cKQ/curry.jpg",
 //    cuisine: "Chinese",
 //    cookTime: 30,
 //    chefName: "Mario",
 //    publishTime: "15/08/23",
 //   },
 //  ];

 const [recipes, setRecipes] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   const apiUrl = `http://localhost:8100/user_recipe/${user.user_id}`;
   const response = await axios.get(apiUrl);
   console.log(response.data);
   response.data.map(async (recipe) => {
    const { recipe_id } = recipe;
    const response = await axios.get(
     `http://localhost:8100/recipe/${recipe_id}`
    );
    const new_recipe = {
     id: recipe_id,
     title: response.data.name,
     image: response.data.imageUrl,
     cuisine: response.data.cuisine,
     cookTime: response.data.cookingTime,
     chefName: user.first_name,
     publishTime: NaN,
    };
    // console.log(new_recipe);
    setRecipes((recipes) => [...recipes, new_recipe]);
   });
  };
  fetchData();
 }, []);

 return (
  <div className="bg-white rounded-lg shadow-lg p-4">
   <div className="text-left border-b">
    <h1 className="text-2xl font-semibold text-gray-500 mb-2">
     {user.first_name}'s Recipes
    </h1>
   </div>

   <div className="mt-3 grid lg:grid-cols-4 gap-3">
    {recipes.map((recipe, index) => (
     <RecipeCard
      recipeId={recipe.id}
      title={recipe.title}
      image={recipe.image}
      cuisine={recipe.cuisine}
      publishTime={recipe.publishTime}
      chefName={recipe.chefName}
      cookTime={recipe.cookTime}
     />
    ))}
   </div>
  </div>
 );
};

export default UserPosts;
