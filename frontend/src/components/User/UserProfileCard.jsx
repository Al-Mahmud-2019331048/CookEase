import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "./Avatar";
import Follow from "./Follow";

const UserProfileCard = ({ user }) => {
 const [own, setOwn] = useState(false);
 const [userStat, setUserStat] = useState({});

 useEffect(() => {
  const fetchUserStat = async () => {
   const apiUrl = `http://localhost:8100/user_stat/${user.user_id}`;
   const response = await axios.get(apiUrl);
   setUserStat(response.data);
   setOwn(user.user_id == localStorage.getItem("user_id"));
  };
  fetchUserStat();
 }, []);
 return (
  <div class="w-full rounded-lg p-12 shadow-lg bg-white">
   <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="grid-cols-1 lg:col-span-3">
     {user.profile_pic_url && (
      <img
       src={user.profile_pic_url}
       className="w-30 h-30 rounded-full mx-auto mb-3 border-2 border-pink-600"
      />
     )}
     {!user.profile_pic_url && <Avatar className="mx-auto mb-3" />}
    </div>

    <div class="col-span-1 lg:col-span-9">
     <div class="text-center lg:text-left">
      <h2 class="text-2xl font-bold text-zinc-700">
       {user.first_name} {user.last_name}
      </h2>
      <p class="mt-2 font-semibold text-zinc-700">@{user.user_id}</p>
      <p class="mt-4 text-zinc-500">{user.email}</p>
     </div>

     <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left">
      <div>
       <p class="font-bold text-zinc-700">{userStat.posts}</p>
       <p class="text-sm font-semibold text-zinc-700">Posts</p>
      </div>

      <div>
       <p class="font-bold text-zinc-700">{userStat.followers}</p>
       <p class="text-sm font-semibold text-zinc-700">Followers</p>
      </div>

      <div>
       <p class="font-bold text-zinc-700">{userStat.followings}</p>
       <p class="text-sm font-semibold text-zinc-700">Following</p>
      </div>
      {!own && <Follow user={user} />}
     </div>
    </div>
   </div>
  </div>
 );
};

export default UserProfileCard;
