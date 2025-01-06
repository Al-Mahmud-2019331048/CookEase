import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleLogin = (e) => {
  e.preventDefault();
  const login = async () => {
   const formData = {
    email: email,
    password: password,
   };
   const res = await axios.post("http://localhost:8100/login_user", formData);
   if (res.status === 200) {
    console.log(res.data);
    localStorage.setItem("user_id", res.data.user_id);
    localStorage.setItem("first_name", res.data.first_name);
    localStorage.setItem("last_name", res.data.last_name);
    localStorage.setItem("email", res.data.email);
    navigate("/");
   }
  };
  (() => {
   login();
  })();
 };

 return (
  <>
   <Header />
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96">
     <h2 className="text-2xl font-semibold mb-4">Login</h2>
     <form onSubmit={handleLogin}>
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
        Log In
       </button>
       <Link to="/signup">
        <div className="w-full border border-2 border-pink-600 text-pink-600 text-center p-2 rounded-md hover:bg-pink-800 focus:outline-none focus:ring focus:ring-indigo-300">
         Create an account
        </div>
       </Link>
      </div>
     </form>
    </div>
   </div>
  </>
 );
};

export default Login;
