import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Register = () => {
 const navigate = useNavigate();

 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleRegistration = async (e) => {
  e.preventDefault();
  const formData = {
   first_name: firstName,
   last_name: lastName,
   email: email,
   password: password,
  };
  const response = await axios.post("http://localhost:8100/add_user", formData);
  console.log(response);
  navigate("/login");
 };

 return (
  <>
   <Header />

   <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96">
     <h2 className="text-2xl font-semibold mb-4">Register</h2>
     <form onSubmit={handleRegistration}>
      <div className="mb-4">
       <label
        htmlFor="firstName"
        className="block text-sm font-medium text-gray-700">
        First Name
       </label>
       <input
        type="text"
        id="firstName"
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
       />
      </div>
      <div className="mb-4">
       <label
        htmlFor="lastName"
        className="block text-sm font-medium text-gray-700">
        Last Name
       </label>
       <input
        type="text"
        id="lastName"
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
       />
      </div>
      <div className="mb-4">
       <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700">
        Email
       </label>
       <input
        type="email"
        id="email"
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       />
      </div>
      <div className="mb-4">
       <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700">
        Password
       </label>
       <input
        type="password"
        id="password"
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
       />
      </div>
      <div className="flex flex-col space-y-2">
       <button
        type="submit"
        className="w-full bg-pink-600 text-white p-2 rounded-md hover:bg-pink-800 focus:outline-none focus:ring focus:ring-indigo-300">
        Sign Up
       </button>
       <Link to="/login">
        <div className="w-full border border-2 border-pink-600 text-pink-600 text-center p-2 rounded-md hover:bg-pink-800 focus:outline-none focus:ring focus:ring-indigo-300">
         Log In
        </div>
       </Link>
      </div>
     </form>
    </div>
   </div>
  </>
 );
};

export default Register;
