import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryVideoId, setCategoryVideoId] = useState(1); // Default to category ID 1
  const [categories, setCategories] = useState([]); // State for categories
  const [thumbnail, setThumbnail] = useState(null); // State for thumbnail
  const [videoUrl, setVideoUrl] = useState(null); // State for video URL
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categoryVideo"); // Adjust the URL as needed
        setCategories(response.data); // Assume response is an array of categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description || !videoUrl || !thumbnail) {
      alert("Judul, deskripsi, video, dan thumbnail tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title); // Ensure this matches the backend field names
    formData.append("description", description);
    formData.append("categoryVideoId", categoryVideoId);
    formData.append("videoUrl", videoUrl); // Ensure the backend expects 'videoUrl'
    formData.append("thumbnailUrl", thumbnail); // Ensure the backend expects 'thumbnailUrl'

    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:4000/videoTutorial",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success notification
      setNotification({
        message: "Video berhasil ditambahkan!",
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
        navigate("/admin/videos"); // Redirect after successful creation
      }, 3000);
    } catch (error) {
      console.error("Failed to create video:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  return (
    <div className="p-5 font-sans">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl mx-auto">
        <h2 className="text-xl font-semibold">Tambah Video</h2>
      </div>

      <form
        onSubmit={handleCreate}
        className="mt-5 "
      >
        {/* Title Input */}
        <input
          type="text"
          placeholder="Judul Video"
          className="input input-bordered w-full mb-5 text-black bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category Selection */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block text-sm font-semibold mb-2 text-black bg-white"
          >
            Pilih Kategori
          </label>
          <select
            id="category"
            className="select select-bordered w-full text-black bg-white"
            value={categoryVideoId}
            onChange={(e) => setCategoryVideoId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quill.js Editor for Description */}
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-5 text-black"
          theme="snow"
          placeholder="Deskripsi Video"
        />

        {/* Video Upload */}
        <div className="mb-5">
          <label
            htmlFor="videoUrl"
            className="block text-sm font-semibold mb-2 text-black" 
          >
            Upload Video
          </label>
          <input
            type="file"
            id="videoUrl"
            className="file-input file-input-bordered w-full text-black bg-white"
            accept="video/*"
            onChange={(e) => setVideoUrl(e.target.files[0])}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-5">
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-semibold mb-2 text-black"
          >
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="thumbnailUrl"
            className="file-input file-input-bordered w-full text-black bg-white"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="btn bg-[#055941] text-white w-40">
            Tambah Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVideo;
