

import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
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
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
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
          }}
          onEditorChange={(newContent) => setContent(newContent)}
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

