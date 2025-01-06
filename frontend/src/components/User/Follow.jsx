import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Follow = ({ user }) => {
 const [followed, setFollowed] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   const apiUrl = `http://localhost:8100/is_user_following/`;
   const formData = {
    p_follower: +localStorage.getItem("user_id"),
    p_followed: +user.user_id,
   };
   try {
    const response = await axios.post(apiUrl, formData);
    //  console.log(response.data.following);
    setFollowed(response.data.following);
   } catch (err) {
    console.error(err);
   }
  };
  fetchData();
 });

 const doFollow = async () => {
  const apiUrl = `http://localhost:8100/follow/`;
  const formData = {
   following: +localStorage.getItem("user_id"),
   followed: +user.user_id,
  };
  try {
   await axios.post(apiUrl, formData);
   setFollowed(true);
  } catch (err) {
   console.error(err);
  }
 };

 const doUnfollow = async () => {
  const apiUrl = `http://localhost:8100/unfollow/`;
  const formData = {
   following: localStorage.getItem("user_id"),
   followed: user.user_id,
  };
  try {
   await axios.post(apiUrl, formData);
   setFollowed(false);
  } catch (err) {
   console.error(err);
  }
 };

 return (
  <>
   {followed && (
    <button
     class="w-full rounded-lg border-2 border-pink-500 bg-white px-3 py-2 font-semibold text-pink-500 hover:bg-pink-500 hover:text-white"
     onClick={doUnfollow}>
     Unfollow
    </button>
   )}
   {!followed && (
    <button
     class="w-full rounded-lg border-2 border-pink-500 bg-white px-3 py-2 font-semibold text-pink-500 hover:bg-pink-500 hover:text-white"
     onClick={doFollow}>
     Follow
    </button>
   )}
  </>
 );
};

export default Follow;
