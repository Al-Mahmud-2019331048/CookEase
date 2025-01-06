import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
 FavoriteBorder,
 Favorite,
 BookmarkBorder,
 Bookmark,
 RestaurantMenu,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// recipeId, imageUrl, caption, author, authorId, profilePic, time, reactionCount, commentCount
const PostCard = ({ post }) => {
 const [liked, setLiked] = useState(false);
 const [saved, setSaved] = useState(false);

 const fetchPostStatUser = async () => {
  try {
   const apiUrl = `http://localhost:8100/post_stat`;
   const formData = {
    user_id: localStorage.getItem("user_id"),
    recipe_id: post.recipeId,
   };
   const res = await axios.post(apiUrl, formData);
   setLiked(res.data.liked);
   setSaved(res.data.saved);
  } catch (error) {
   console.error("Error fetching recipe data:", error);
  }
 };

 useEffect(() => {
  fetchPostStatUser();
 }, []);

 useEffect(() => {
  fetchPostStatUser();
 }, [liked, saved]);

 const addReaction = async (e) => {
  await axios.post("http://localhost:8100/add_post_reaction", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: post.recipeId,
  });
  setLiked(true);
 };

 const removeReaction = async (e) => {
  await axios.post("http://localhost:8100/rmv_post_reaction", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: post.recipeId,
  });
  setLiked(false);
 };

 const addBookmark = async (e) => {
  await axios.post("http://localhost:8100/save_post", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: post.recipeId,
  });
  setSaved(true);
 };

 const removeBookmark = async (e) => {
  await axios.post("http://localhost:8100/remove_saved_post", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: post.recipeId,
  });
  setSaved(false);
 };

 return (
  <div className="bg-white shadow-md p-4 rounded-lg mb-4">
   <div className="flex items-center mb-2">
    <img
     src={post.profilePic}
     alt="PostCard"
     className="w-10 h-10 rounded-full mr-2"
    />
    <div>
     <Link to={`/user/${post.authorId}`}>
      <p className="font-semibold text-pink-600">{post.author}</p>
     </Link>
     <p className="text-sm text-gray-600">{post.time}</p>
    </div>
   </div>
   <p className="text-gray-700 mb-2 line-clamp-3">{post.caption}</p>
   <img
    src={`http://localhost:8100/images/${post.imageUrl}`}
    alt="PostCard"
    className="w-full h-[600px] object-cover mb-2 rounded-lg w-full"
   />
   <div className="flex justify-between pb-1">
    <p className="text-sm text-gray-600 inline">{post.reactionCount} likes</p>
    <p className="text-sm text-gray-600 inline">{post.commentCount} comments</p>
   </div>
   <div className="flex items-center justify-between text-gray-600 w-full px-10 pt-2 border-t-2 border-black-100">
    <div className="mr-4 flex items-center">
     {!liked && (
      <button className="flex items-center space-x-1" onClick={addReaction}>
       <FavoriteBorder />
       <span>Like</span>
      </button>
     )}
     {liked && (
      <button className="flex items-center space-x-1" onClick={removeReaction}>
       <Favorite />
       <span>Unlike</span>
      </button>
     )}
    </div>
    <div className="mr-4 flex items-center">
     {!saved && (
      <button className="flex items-center space-x-1" onClick={addBookmark}>
       <BookmarkBorder />
       <span>Save</span>
      </button>
     )}
     {saved && (
      <button className="flex items-center space-x-1" onClick={removeBookmark}>
       <Bookmark />
       <span>Unsave</span>
      </button>
     )}
    </div>
    <div className="flex items-center">
     <Link to={`/recipe/${post.recipeId}`}>
      <button className="flex items-center space-x-1">
       <RestaurantMenu />
       <span>Recipe</span>
      </button>
     </Link>
    </div>
   </div>
  </div>
 );
};

export default PostCard;
