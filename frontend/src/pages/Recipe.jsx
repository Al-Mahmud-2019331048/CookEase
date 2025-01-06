import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
 BookmarkBorder,
 Bookmark,
 FavoriteBorder,
 Favorite,
 ChatBubbleOutline,
 CameraAltOutlined,
 Print,
} from "@mui/icons-material";

import Header from "../components/Header";
import PostHead from "../components/Posts/PostHead";
import Ingredient from "../components/Ingredient/Ingredient";
import CommentSection from "../components/Comment/CommentSection";
import Description from "../components/Posts/Description";
import UserCard from "../components/User/UserCard";
import CommentInput from "../components/Comment/CommentInput";
import Instruction from "../components/Instruction/Instruction";
import AddCookDay from "../components/Day/AddCookDay";

const Recipe = (props) => {
 const { id } = useParams();
 const [recipe, setRecipe] = useState(null);
 const [user, setUser] = useState(null);
 const [comments, setComments] = useState([]);
 const [ingredients, setIngredients] = useState([]);
 const [steps, setSteps] = useState([]);
 const [liked, setLiked] = useState(false);
 const [saved, setSaved] = useState(false);

 useEffect(() => {
  const fetchRecipe = async () => {
   try {
    const apiUrl = `http://localhost:8100/recipe/${id}`;
    const response = await axios.get(apiUrl);
    setRecipe(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchUser = async () => {
   try {
    const apiUrl = `http://localhost:8100/user_by_recipe/${id}`;
    const response = await axios.get(apiUrl);
    setUser(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchComments = async () => {
   try {
    const apiUrl = `http://localhost:8100/comments_by_post/${id}`;
    const response = await axios.get(apiUrl);
    setComments(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchSteps = async () => {
   try {
    const apiUrl = `http://localhost:8100/steps/${id}`;
    const response = await axios.get(apiUrl);
    setSteps(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchIngredients = async () => {
   try {
    const apiUrl = `http://localhost:8100/ingredients/${id}`;
    const response = await axios.get(apiUrl);
    setIngredients(response.data);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  const fetchPostStatUser = async () => {
   try {
    const apiUrl = `http://localhost:8100/post_stat`;
    const formData = {
     user_id: localStorage.getItem("user_id"),
     recipe_id: id,
    };
    const res = await axios.post(apiUrl, formData);
    setLiked(res.data.liked);
    setSaved(res.data.saved);
   } catch (error) {
    console.error("Error fetching recipe data:", error);
   }
  };

  (async () => {
   await fetchRecipe();
   await fetchUser();
   await fetchComments();
   await fetchSteps();
   await fetchIngredients();
   await fetchPostStatUser();
  })();
 }, []);

 const addReaction = async (e) => {
  await axios.post("http://localhost:8100/add_post_reaction", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: id,
  });
  setLiked(true);
 };

 const removeReaction = async (e) => {
  await axios.post("http://localhost:8100/rmv_post_reaction", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: id,
  });
  setLiked(false);
 };

 const addBookmark = async (e) => {
  await axios.post("http://localhost:8100/save_post", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: id,
  });
  setSaved(true);
 };

 const removeBookmark = async (e) => {
  await axios.post("http://localhost:8100/remove_saved_post", {
   user_id: localStorage.getItem("user_id"),
   recipe_id: id,
  });
  setSaved(false);
 };

 const [isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => {
  setIsModalOpen(true);
 };

 const closeModal = () => {
  setIsModalOpen(false);
 };

 return (
  <div>
   <Header />
   {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
     <div className="relative">
      <AddCookDay recipe_id={id} closeModal={closeModal} />
     </div>
    </div>
   )}
   <div className="fixed bottom-1/2 right-12 flex flex-col items-center bg-white rounded-lg shadow-md ml-4 w-12 text-pink-600 space-y-5 p-2">
    {saved && (
     <button onClick={removeBookmark}>
      <Bookmark />
     </button>
    )}
    {!saved && (
     <button onClick={addBookmark}>
      <BookmarkBorder />
     </button>
    )}
    {!liked && (
     <button onClick={addReaction}>
      <FavoriteBorder />
     </button>
    )}
    {liked && (
     <button onClick={removeReaction}>
      <Favorite />
     </button>
    )}
    <a href="#comments">
     <ChatBubbleOutline />
    </a>
    <button onClick={openModal}>
     <CameraAltOutlined />
    </button>
    <Print />
   </div>
   <div className="flex flex-row justify-center space-x-3">
    <div className="w-6/12 flex-col space-y-3">
     {recipe && (
      <PostHead
       name={recipe.name}
       cookingTime={recipe.cookingTime}
       cuisine={recipe.cuisine}
       imageUrl={recipe.imageUrl}
       likeCount={recipe.likeCount}
       commentCount={recipe.commentCount}
      />
     )}
     {recipe && <Description text={recipe.description} />}
     {ingredients && <Ingredient ingredients={ingredients} />}
     {steps && <Instruction steps={steps} />}
    </div>
    <div className="w-3/12 flex-col space-y-3">
     {user && <UserCard user={user} />}
     <CommentSection comments={comments} />
     <CommentInput recipe_id={id} />
    </div>
   </div>
  </div>
 );
};

export default Recipe;
