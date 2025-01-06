import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

function DateTimePicker() {
 const [selectedDate, setSelectedDate] = useState(new Date());

 const handleDateChange = (date) => {
  setSelectedDate(date);
 };

 return (
  <div className="my-4">
   <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    showTimeSelect
    dateFormat="MMMM d, yyyy h:mm aa"
    className="w-full border border-gray-300 rounded py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
   />
  </div>
 );
}

export default DateTimePicker;
