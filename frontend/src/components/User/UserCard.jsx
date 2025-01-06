import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Follow from "./Follow";

const UserCard = ({ user }) => {
 const [own, setOwn] = useState(false);
 useEffect(() => {
  setOwn(localStorage.getItem("user_id") === user.user_id);
 });
 return (
  <div className="bg-white p-4 rounded-lg shadow-md">
   {user.profile_pic_url && (
    <img
     src={user.profile_pic_url}
     className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-pink-600"
    />
   )}
   {!user.profile_pic_url && <Avatar className="mx-auto mb-3" />}
   <h2 className="text-lg text-center font-abril-fatface">
    {user.first_name} {user.last_name}
   </h2>
   <p className="text-gray-600 text-center">{user.email}</p>
   <div className="mt-3 flex flex-row space-x-3">
    {!own && <Follow user={user} className="w-full"/>}
    <Link to={`/user/${user.user_id}`} className="w-full">
     <button className="py-2 w-full border-2 border-pink-600 text-pink-600 rounded-lg">
      View Profile
     </button>
    </Link>
   </div>
  </div>
 );
};

export default UserCard;
