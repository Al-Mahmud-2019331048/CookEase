import React, { useState } from "react";

import { Close } from "@mui/icons-material";
import axios from "axios";

function AddCookDay({ recipe_id, closeModal }) {
 const [caption, setCaption] = useState("");
 const [image, setImage] = useState(null);

 const uploadFile = async (selectedFile) => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
   const response = await axios.post("http://localhost:8100/upload", formData, {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   });
   return response;
  } catch (err) {
   console.error(err);
  }
 };

 const handleCaptionChange = (e) => {
  setCaption(e.target.value);
 };

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const file = await uploadFile(image);
  const formData = {
   recipe_id: recipe_id,
   user_id: localStorage.getItem("user_id"),
   cooksnap_url: file.data,
   caption: caption,
  };
  try {
   const res = await axios.post("http://localhost:8100/add_cooksnap", formData);
   closeModal();
   //    console.log(res.data);
  } catch (err) {
   console.error(err);
  }
 };

 return (
  <div className="container mx-auto max-w-lg">
   <div className="bg-white border rounded-xl shadow-lg p-6">
    <div className="flex flex-row justify-between border-b-2">
     <h2 className="text-2xl font-semibold mb-2">Add a CookSnap</h2>
     <button
      className="p-2 rounded-full bg-gray-200 h-8 w-8 text-md text-gray-500 flex items-center justify-center"
      onClick={closeModal}>
      <Close />
     </button>
    </div>
    <form onSubmit={handleSubmit}>
     <div className="mt-4 mb-4">
      <label
       htmlFor="caption"
       className="block text-gray-700 font-semibold mb-2">
       Caption
      </label>
      <textarea
       id="caption"
       className="w-full border rounded py-2 px-3 h-20 focus:outline-none focus:border-pink-500"
       placeholder="Enter your caption"
       value={caption}
       onChange={handleCaptionChange}
      />
     </div>
     <div className="mb-4">
      <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
       Image
      </label>
      <input
       type="file"
       id="image"
       className="w-full border rounded py-2 px-3 focus:outline-none focus:border-pink-500"
       accept="image/*"
       onChange={handleImageChange}
      />
     </div>
     <div className="text-right">
      <button
       type="submit"
       className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
       Post
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}

export default AddCookDay;
