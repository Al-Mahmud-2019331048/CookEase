import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
 Close,
 Send,
 FavoriteBorder,
 RestaurantMenu,
} from "@mui/icons-material";

const Comment = ({ author, text }) => {
 return (
  <div className="flex space-x-4">
   <div className="flex-shrink-0">
    <img
     src="https://via.placeholder.com/40"
     alt={`${author}'s Profile`}
     className="w-10 h-10 rounded-full"
    />
   </div>
   <div className="flex-grow">
    <p className="font-semibold">{author}</p>
    <p className="text-gray-600">{text}</p>
   </div>
  </div>
 );
};

const CookDayModal = ({ snap, setModal }) => {
 const [user, setUser] = useState({});
 const [comments, setComments] = useState([]);
 const [comment, setComment] = useState("");

 const fetchComments = async () => {
  try {
   const apiUrl = `http://localhost:8100/comments_by_cooksnap/${snap.cooksnap_id}`;
   const response = await axios.get(apiUrl);
   setComments(response.data);
  } catch (error) {
   console.error("Error fetching recipe data:", error);
  }
 };
 useEffect(() => {
  const fetchUser = async () => {
   const res = await axios.get(`http://localhost:8100/users/${snap.user_id}`);
   setUser(res.data[0]);
  };

  fetchComments();
  fetchUser();
 }, []);

 const handleCommentChange = (event) => {
  setComment(event.target.value);
 };

 const addComment = async () => {
  if (comment.trim() !== "") {
   const formData = {
    cooksnap_id: snap.cooksnap_id,
    user_id: localStorage.getItem("user_id"),
    comment_text: comment,
   };
   await axios.post("http://localhost:8100/add_cooksnap_comment", formData);
   setComment("");
   await fetchComments();
  }
 };

 return (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
   <div className="fixed inset-0 bg-black opacity-40"></div>
   <div className="flex flex-row rounded-3xl shadow-lg w-3/4 h-3/4 relative space-x-4">
    <div className="w-1/2 relative flex-none">
     <img
      src={`http://localhost:8100/${snap.cooksnap_url}`}
      alt="Cook Snap"
      className="h-full rounded-3xl object-cover"
     />
     <div className="flex flex-col space-y-3 absolute right-5 bottom-5">
      <Link to={`/recipe/${snap.recipe_id}`}>
       <button className="h-10 w-10 p-2 rounded-full bg-gray-800 bg-opacity-40 text-white">
        <RestaurantMenu />
       </button>
      </Link>
      <button className="h-10 w-10 p-2 rounded-full bg-gray-800 bg-opacity-40 text-white">
       <FavoriteBorder />
      </button>
     </div>
     <div className="absolute left-1/2 transform -translate-x-1/2 bottom-5">
      <p className="p-1 bg-gray-800 bg-opacity-70 text-white">{snap.caption}</p>
     </div>
     <div className="absolute left-5 top-5">
      <div className="flex flex-row space-x-3">
       <img
        src={user.profile_pic_url}
        className="h-14 w-14 rounded-full border border-2 border-pink-600"
       />
       <div className="flex flex-col space-y-1">
        <p className="p-1 bg-gray-800 bg-opacity-30">
         {user.first_name} {user.last_name}
        </p>
        <p>@{user.user_id}</p>
       </div>
      </div>
     </div>
    </div>

    <div className="flex-grow p-4 bg-white rounded-3xl">
     {/* Comment Section */}
     <div className="flex flex-row justify-between pb-2 border-b">
      <h1 className="text-2xl font-bold">Comments</h1>
      <button
       className="p-2 rounded-full bg-gray-200 h-8 w-8 text-md text-gray-500 flex items-center justify-center"
       onClick={() => {
        setModal(null);
       }}>
       <Close />
      </button>
     </div>

     <div className="space-y-4 mt-3 mb-3">
      {comments &&
       comments.map((e) => (
        <Comment author={e.user.first_name} text={e.comment.comment_text} />
       ))}
     </div>

     {/* Add Comment Form */}
     <div className="relative">
      <div className="flex">
       <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        className="w-full border rounded-full py-2 px-4 pr-12 focus:outline-none"
        onChange={handleCommentChange}
       />
       <button
        className="absolute right-0 top-0 h-full text-gray-500 px-4 py-2 rounded-full"
        onClick={addComment}>
        <Send />
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CookDayModal;
