import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import {
 AccessTimeFilled,
 RestaurantMenu,
 Favorite,
} from "@mui/icons-material";

const RecipeCard = ({
 recipeId,
 title,
 image,
 cuisine,
 publishTime,
 chefName,
 cookTime,
}) => {
 return (
  <>
   <Link to={`/recipe/${recipeId}`}>
    <div className="recipe-card">
     <div className="badge bg-pink-600 text-white">
      <AccessTimeFilled /> {cookTime} min
     </div>
     <div className="badge1 bg-pink-600 text-white flex items-center">
      <RestaurantMenu />
      {cuisine}
     </div>
     <div className="badge2 bg-gray-300 hover:bg-pink-600 active:bg-pink-600 text-white">
      <Favorite />
     </div>
     <img
      src={`http://localhost:8100/images/${image}`}
      alt={title}
      className="recipe-image transform hover:scale-105 transition-transform duration-300"
     />
     <div className="card-details">
      <h2 className="title line-clamp-1">{title}</h2>
      <p className="chef-name line-clamp-1">by {chefName}</p>
      <p className="publish-time">Published on {publishTime}</p>
     </div>
    </div>
   </Link>
  </>
 );
};

export default RecipeCard;
