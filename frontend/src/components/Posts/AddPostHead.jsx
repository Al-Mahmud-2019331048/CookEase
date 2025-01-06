import React, { useEffect, useState } from "react";
import axios from "axios";
import {
 CloudUpload,
 AccessTimeFilled,
 RestaurantMenu,
} from "@mui/icons-material";

const AddPostHead = ({
 setName,
 setCuisine,
 setCookingTime,
 selectedFile,
 setSelectedFile,
}) => {
 const [cuisines, setCuisines] = useState([]);
 useEffect(() => {
  const apiUrl = "http://localhost:8100/get_cuisines";
  axios
   .get(apiUrl)
   .then((response) => {
    setCuisines(response.data);
   })
   .catch((error) => {
    console.error("Error fetching cuisines:", error);
   });
 }, []);

 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  // console.log(file);
  setSelectedFile(file);
 };

 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md flex flex-col space-y-3">
   <textarea
    className="w-full rounded-lg bg-gray-100 text-gray-500 border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 text-3xl md:text-4xl font-bold text-center font-dancing-script"
    placeholder="Enter recipe title"
    rows="1"
    onChange={(e) => setName(e.target.value)}
   />

   <div className="grid grid-cols-2 gap-4">
    <div className="bg-white p-1 rounded-full border border-gray-300 border-dotted flex flex-row space-x-2">
     <div className="p-1 text-pink-600">
      <RestaurantMenu />
     </div>
     <select
      className="bg-gray-100 w-full rounded-full border border border-dotted border-gray-300 p-2 text-gray-400"
      onChange={(e) => setCuisine(e.target.value)}>
      <option value="" selected disabled hidden>
       Select Cuisine
      </option>
      {cuisines.map((cuisine) => (
       <option key={cuisine.cuisine_id} value={cuisine.cuisine_id}>
        {cuisine.cuisine_name}
       </option>
      ))}
     </select>
    </div>

    <div className="bg-white p-1 rounded-full border border-gray-300 border-dotted flex flex-row space-x-2">
     <div className="p-1 text-pink-600">
      <AccessTimeFilled />
     </div>
     <input
      className="w-full p-1 bg-gray-100 rounded-full pl-2 text-gray-400 focus:outline-none"
      placeholder="Cooking time in minutes..."
      type="number"
      onChange={(e) => setCookingTime(e.target.value)}
     />
    </div>
   </div>

   <div className="flex justify-center align-center rounded-lg border-2 border-dotted h-[50vh] bg-gray-100">
    <label
     htmlFor="imageUpload"
     className="cursor-pointer bg-gray-300 rounded-lg p-3 m-auto font-bold text-gray-500 border-gray-400 border-2 border-dotted flex shadow-md">
     <input
      type="file"
      id="imageUpload"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
     />
     <CloudUpload className="mr-3" />
     {selectedFile ? selectedFile.name : "Add Image"}
    </label>
   </div>
  </div>
 );
};

export default AddPostHead;
