import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Contests from "./pages/Contests";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import User from "./pages/User";
import BookMarks from "./pages/BookMarks";
import AddCookDay from "./components/Day/AddCookDay";

function App() {
 return (
  <>
   <div className="bg-gray-100 min-h-screen space-y-2 pb-5">
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/contests" element={<Contests />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/add_recipe" element={<AddRecipe />} />
      <Route path="/bookmarks" element={<BookMarks />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/user/:id" element={<User />} />
     </Routes>
    </BrowserRouter>
   </div>
  </>
 );
}

export default App;
