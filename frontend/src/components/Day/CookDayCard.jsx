import React, { useEffect, useState } from "react";
import axios from "axios";

const CookDayCard = ({ snap }) => {
 const [user, setUser] = useState({});
 useEffect(() => {
  const fetchUser = async () => {
   const res = await axios.get(`http://localhost:8100/users/${snap.user_id}`);
   setUser(res.data[0]);
  };
  fetchUser();
 }, [snap.user_id]);
 return (
  <div className="relative rounded-lg shadow-md border">
   <div className="rounded-full border border-4 border-pink-600 absolute top-2 left-2">
    <img
     src={user.profile_pic_url}
     className="rounded-full h-10 w-10 object-cover"
    />
   </div>
   <div className="p-1 rounded-md bg-pink-600 text-white text-xs font-semibold absolute bottom-2 left-2">
    {user.first_name} {user.last_name}
   </div>
   <img
    src={`http://localhost:8100/images/${snap.cooksnap_url}`}
    className="rounded-lg h-64 w-full object-cover"
   />
  </div>
 );
};

export default CookDayCard;
