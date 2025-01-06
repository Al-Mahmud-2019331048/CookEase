import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
 Home,
 Explore,
 CircleNotifications,
 AccountCircle,
 EmojiEvents,
 Fastfood,
 PostAdd,
 Bookmarks,
 Login,
 Logout,
} from "@mui/icons-material";

const Header = () => {
 const [loggedIn, setLoggedIn] = useState(false);
 useEffect(() => {
  const checkLoggedIn = () => {
   const res = localStorage.getItem("user_id");
   if (res == null) setLoggedIn(false);
   else setLoggedIn(true);
  };
  (() => {
   checkLoggedIn();
  })();
 }, []);

 return (
  <div className="mb-12 pb-5">
   <nav className="bg-white text-pink-600 p-3 border-b-2 fixed top-0 w-full z-50">
    <div className="container mx-auto flex justify-between items-center">
     <div className="flex items-center space-x-2 text-lg font-bold">
      <Fastfood />
      <span>CookEase</span>
     </div>
     <div className="space-x-4">
      <Link to="/">
       <Home />
      </Link>
      <Link to="/posts">
       <Explore />
      </Link>
      {loggedIn && (
       <Link to="/add_recipe">
        <PostAdd />
       </Link>
      )}
      <Link to="/contests">
       <EmojiEvents />
      </Link>
      {loggedIn && (
       <Link to="/bookmarks">
        <Bookmarks />
       </Link>
      )}
     </div>
     <div className="flex space-x-4">
      {loggedIn && (
       <>
        <Link to={``}>
         <CircleNotifications />
        </Link>
        <Link to={`/user/${localStorage.getItem("user_id")}`}>
         <AccountCircle />
        </Link>
        <Link to="/login">
         <button
          onClick={() => {
           localStorage.removeItem("user_id");
          }}>
          <Logout />
         </button>
        </Link>
       </>
      )}
      {!loggedIn && (
       <>
        <Link to="/login">
         <Login />
        </Link>
       </>
      )}
     </div>
    </div>
   </nav>
  </div>
 );
};

export default Header;
