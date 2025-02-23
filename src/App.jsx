import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AllBlogs from "./pages/AllBlogs";
import BlogInfo from "./pages/BlogInfo";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Nopage from "./pages/Nopage";
import Mystate from "./context/Mystate";
import {Toaster} from "react-hot-toast";
import SearchDialog from "./components/SearchDialog";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
    <Mystate>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/bloginfo/:id" element={<BlogInfo />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/searchdialog" element={<SearchDialog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Nopage />} />
      </Routes>
      <Toaster />
    </Router>
    </Mystate>
    
    </>
  )
}

export default App