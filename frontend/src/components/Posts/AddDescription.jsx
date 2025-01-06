import React from "react";

const AddDescription = ({ setDescription }) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md space-y-3">
   <p className="text-xl font-abril-fatface border-b-2 text-gray-500">
    Description
   </p>
   <textarea
    className="w-full rounded-lg bg-gray-100 text-gray-500 border-2 p-2 border-dotted focus:outline-none focus:border-gray-500"
    placeholder="Write something about the recipe..."
    rows="3"
    onChange={(e) => setDescription(e.target.value)}
   />
  </div>
 );
};

export default AddDescription;
