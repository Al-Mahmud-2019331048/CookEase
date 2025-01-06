import React from "react";
import { Link } from "react-router-dom";

import { Favorite, ChatBubble } from "@mui/icons-material";

// id, name, description, cookingTime, cuisine, imageUrl, likeCount, commentCount
const BookMarkCard = ({ post }) => {
 return (
  <Link to={`/recipe/${post.recipeId}`}>
   <div className="bg-white p-2 rounded-lg shadow-md border">
    <div className="lg:flex lg:flex-row space-x-5">
     <div className="w-2/12">
      <img
       src={`http://localhost:8100/images/${post.imageUrl}`}
       className="rounded-lg w-32 h-full"
       alt="Thumbnail"
      />
     </div>
     <div className="w-10/12 flex flex-col space-y-1">
      <h1 className="font-semibold text-lg text-gray-500">{post.name}</h1>
      <h1 className="font-semibold text-md text-gray-400">{post.cuisine}</h1>
      <h2 className="text-gray-400 line-clamp-2">{post.description}</h2>
      <div className="flex flex-row space-x-2 text-gray-400 pt-2">
       <div className="p-1  border border-gray-200 rounded-full text-sm">
        <Favorite className="pr-1 border-r" />
        <span className="pl-1">{post.likeCount}</span>
       </div>
       <div className="p-1 border border-gray-200 rounded-full text-sm">
        <ChatBubble className="pr-1 border-r" />
        <span className="pl-1">{post.commentCount}</span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </Link>
 );
};

export default BookMarkCard;
