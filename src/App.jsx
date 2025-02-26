import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Mystate from "./context/Mystate";
import {Toaster} from "react-hot-toast";
import SearchDialog from "./components/SearchDialog";
import Auth from "./pages/Auth";
import CreateBlog from "./pages/CreateBlog";
import SingleBlog from "./pages/SingleBlog";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <>
    <Mystate>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactPage /> } />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/searchdialog" element={<SearchDialog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />

      </Routes>
      <Toaster />
    </Router>
    </Mystate>
    
    </>
  )
}

export default App