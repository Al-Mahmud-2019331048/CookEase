import React from "react";

import {
 AccessTimeFilled,
 RestaurantMenu,
 Favorite,
 Comment,
} from "@mui/icons-material";

import "./PostHead.css";

const PostHead = ({
 name,
 cookingTime,
 cuisine,
 imageUrl,
 likeCount,
 commentCount,
}) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md">
   <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 font-dancing-script border-b-2 pb-2">
    {name}
   </h1>
   <div className="flex justify-center items-center relative w-auto h-[70vh]">
    <div className="absolute inset-0 w-full h-full filter backdrop-blur-md">
     <div className="badge bg-pink-600 text-white">
      <AccessTimeFilled /> {cookingTime} min
     </div>
     <div className="badge1 bg-pink-600 text-white flex items-center">
      <RestaurantMenu />
      {cuisine}
     </div>
     <img src={`http://localhost:8100/images/${imageUrl}`} className="w-full h-full object-cover shadow-lg" />
     <div className="absolute bottom-0 left-0 w-full bg-gray-600 opacity-50">
      <div className="flex justify-between items-center px-4 py-2">
       <div className="flex items-center text-white">
        <Favorite className="text-pink-600" />
        <span className="ml-2">{likeCount} people loved the dish</span>
       </div>
       <div className="flex items-center text-white">
        <Comment className="text-pink-600" />
        <span className="ml-2">{commentCount} people commented</span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PostHead;
