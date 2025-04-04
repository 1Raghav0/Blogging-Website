import { useState,useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/Firebase";
import Mycontext from "../context/Mycontext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const { mode } = useContext(Mycontext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const extractFirstImage = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.querySelector("img")?.src || ""; // Extract first image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a blog.");
      return;
    }

    const firstImage = extractFirstImage(content); // Extract image before saving

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        image: firstImage, // Store extracted image URL
        authorName: user.name,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
      });
      alert("Blog created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating blog");
    }
  };

  return (
    <div className={`max-w-3xl mx-auto mt-24 p-6 shadow-lg rounded-lg ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Blog</h2>
      <form 
  onSubmit={handleSubmit} 
  className={`p-4 rounded-lg transition-colors duration-300 ${mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
>
  <input
    type="text"
    placeholder="Enter blog title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className={`w-full p-2 border rounded mb-4 transition-all duration-300 ${
      mode === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"
    }`}
  />

  <Editor
    apiKey="a3jrhn23yz31niinna6mglvtdky1ibn47pbsuliupn6hlvyu"
    value={content}
    init={{
      height: 300,
      menubar: false,
      plugins: "link image lists code",
      toolbar:
        "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
      content_style: mode === "dark" 
        ? "body { background-color: #1f2937; color: white; }" 
        : "body { background-color: white; color: black; }"
    }}
    onEditorChange={(newContent) => setContent(newContent)}
  />

  <div className="flex items-center justify-between">
    <button
      type="submit"
      className="mt-4 px-4 py-2 rounded transition-all duration-300 bg-green-500 text-white hover:bg-green-600"
    >
      Publish Blog
    </button>
  </div>
</form>

    </div>
  );
};

export default CreateBlog;
