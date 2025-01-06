import React from "react";
import Header from "../components/Header";
import RecentRecipes from "../components/Home/RecentRecipes";
import FeaturedRecipes from "../components/Home/FeaturedRecipe";

const Home = () => {
 return (
  <div>
   <Header />
   <div className="flex justify-center items-center">
    <div className="w-9/12">
     <RecentRecipes />
     <FeaturedRecipes />
    </div>
   </div>
  </div>
 );
};

export default Home;
