import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import BookMarkCard from "../components/BookMarks/BookMarkCard";
import axios from "axios";

const BookMarks = () => {
 // name, intro, description, cookingTime, cuisine, imageurl, likecount, commentcount
 //  const posts = [
 //   {
 //    id: 100,
 //    name: "Kung Pao Chicken Recipe",
 //    description:
 //     "Kung Pao Chicken is the internet's latest favourite food sensation with its appealing look and lip-smacking taste. It is a classic Chinese recipe that is loved by chicken lovers all over the world. Prepared using broccoli, chicken, carrot, bell peppers, ginger, garlic, soy sauce, schezwan sauce, cornflour and spring onions, it is a delectable main dish recipe that can be savoured for lunch as well as for dinner. You can serve this chicken recipe with noodles or rice and a beverage of your choice to make it into a complete meal. Occasions like kitty parties, potlucks, game nights and family get-togethers are apt to relish this non-vegetarian recipe and will surely leave your guests astounded with its lip-smacking taste. So, don't hold on any longer and try out this easy recipe right away! (image credits- istock)",
 //    cookingTime: 250,
 //    cuisine: "Chinese",
 //    imageUrl:
 //     "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=300",
 //    likeCount: 123,
 //    commentCount: 435,
 //   },
 //  ];

 const [posts, setPosts] = useState([]);

 useEffect(() => {
  const fetchBookMarks = async () => {
   try {
    const formData = {
     user_id: localStorage.getItem("user_id"),
    };
    const res = await axios.post("http://localhost:8100/bookmarks", formData);
    res.data.map(async ({ recipe_id }) => {
     const post = await axios.get(`http://localhost:8100/recipe/${recipe_id}`);
     setPosts((posts) => [...posts, post.data]);
    });
   } catch (err) {
    console.error(err);
   }
  };
  (() => {
   fetchBookMarks();
  })();
 }, []);

 return (
  <div>
   <Header />
   <div className="flex flex-row justify-center space-x-3">
    <div className="w-6/12">
     {posts.map((post) => (
      <BookMarkCard post={post} />
     ))}
    </div>
   </div>
  </div>
 );
};

export default BookMarks;
