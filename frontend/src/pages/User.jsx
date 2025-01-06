import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import UserProfileCard from "../components/User/UserProfileCard";
import UserPosts from "../components/User/UserPosts";

const User = (props) => {
 const { id } = useParams();
 const [user, setUser] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const apiUrl = `http://localhost:8100/users/${id}`;
    const response = await axios.get(apiUrl);
    setUser(response.data[0]);
   } catch (error) {
    console.error("Error fetching user data:", error);
   }
  };

  fetchData();
 }, []);

 return (
  <div>
   <Header />
   {user && (
    <div className="flex justify-center items-center">
     <div className="w-6/12 flex flex-col space-y-3">
      <UserProfileCard user={user} />
      <UserPosts user={user}/>
     </div>
    </div>
   )}
  </div>
 );
};

export default User;
