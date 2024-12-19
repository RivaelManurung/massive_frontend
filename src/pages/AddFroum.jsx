import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddForum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleKeywordChange = (e) => {
    const keywordsArray = e.target.value
      .split(",")
      .map((keyword) => keyword.trim());
    setKeywords(keywordsArray);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (keywords.length > 3) {
      setError("You can only add up to 3 keywords.");
      return;
    }
  
    const sanitizedKeywords = keywords.map((kw) => kw.trim()).filter((kw) => kw !== "");
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("keywords", sanitizedKeywords.join(",")); // Adjust based on backend requirements
    if (image) formData.append("image", image);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in.");
        return;
      }
  
      console.log("Form Data:");
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      const response = await axios.post(
        "http://localhost:4000/forum",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Forum created successfully!");
      navigate(`/forum}`);
    } catch (error) {
      console.error("Error creating forum:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Create a New Forum</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="border border-gray-300 rounded-md w-full min-h-[200px]"
            placeholder="Write your discussion content here..."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="keywords"
            className="block text-gray-700 font-bold mb-2"
          >
            Keywords (comma-separated, max 3)
          </label>
          <input
            type="text"
            id="keywords"
            onChange={handleKeywordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Create Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;
