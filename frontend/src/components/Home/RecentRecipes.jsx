import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { Tag } from "@mui/icons-material";

const RecentRecipes = () => {
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
   const apiUrl = "http://localhost:8100/recent_recipes";
   const response = await axios.get(apiUrl);
//    console.log(response.data);
   response.data.map(async (recipe) => {
    const { recipe_id, post_time } = recipe;
    const response = await axios.get(
     `http://localhost:8100/recipe/${recipe_id}`
    );
    const new_recipe = {
     id: recipe_id,
     title: response.data.name,
     image: response.data.imageUrl,
     cuisine: response.data.cuisine,
     cookTime: response.data.cookingTime,
     chefName: "Nayem",
     publishTime: post_time,
    };
    // console.log(new_recipe);
    setRecipes((recipes) => [...recipes, new_recipe]);
   });
  };
  fetchData();
 }, []);

 return (
  <>
   <div className="text-left">
    <h1 className="text-2xl font-extrabold text-pink-600 mb-4">
     <Tag style={{ fontSize: "1.8rem" }} />
     Recent Recipes
    </h1>
   </div>
   
   <div className="mt-3 grid lg:grid-cols-5 gap-3">
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

   <div className="flex items-center justify-center h-full">
    <button className="rounded-lg bg-pink-600 p-3 text-white font-bold">
     Show More
    </button>
   </div>
  </>
 );
};

export default RecentRecipes;
