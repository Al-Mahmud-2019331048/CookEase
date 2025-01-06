import React, { useEffect, useState } from "react";
import CookSnapCard from "./CookDayCard";
import axios from "axios";

const CookDay = ({ setModal }) => {
 const [snaps, setSnaps] = useState([]);
 useEffect(() => {
  const fetchSnaps = async () => {
   const res = await axios.get("http://localhost:8100/get_cooksnaps");
   setSnaps(res.data);
  };
  fetchSnaps();
 });
 return (
  <div className="grid grid-cols-5 gap-2">
   {snaps.map((snap) => (
    <button
     onClick={() => {
      setModal(snap);
     }}>
     <CookSnapCard snap={snap} />
    </button>
   ))}
  </div>
 );
};

export default CookDay;
