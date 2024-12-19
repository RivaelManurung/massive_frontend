import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditVideo = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [categoryVideoId, setCategoryVideoId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [existingVideo, setExistingVideo] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null); // Add state for thumbnail file
  const [existingThumbnail, setExistingThumbnail] = useState(""); // Add state for existing thumbnail
  const [notification, setNotification] = useState(null); // Notification state

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoResponse, categoriesResponse] = await Promise.all([
          axios.get(`http://localhost:4000/videoTutorial/${id}`),
          axios.get("http://localhost:4000/categoryVideo"),
        ]);

        const video = videoResponse.data;
        setVideoTitle(video.title || "");
        setVideoDescription(video.description || "");
        setCategoryVideoId(video.categoryVideoId || 1);
        setExistingVideo(video.videoUrl || "");
        setExistingThumbnail(video.thumbnailUrl || ""); // Set existing thumbnail URL
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Gagal memuat data, silakan coba lagi.");
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!videoTitle || !videoDescription) {
      alert("Judul dan deskripsi tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("categoryVideoId", categoryVideoId);

    if (videoFile) {
      formData.append("videoUrl", videoFile);
    }
    if (thumbnailFile) {
      formData.append("thumbnailUrl", thumbnailFile); // Handle thumbnail update
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:4000/videoTutorial/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotification({ message: "Video berhasil diperbarui!", type: "success" });
      setTimeout(() => {
        setNotification(null);
        navigate("/admin/videos"); // Redirect after successful creation
      }, 3000);
    } catch (error) {
      console.error("Failed to create video:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setNotification({ message: error.response.data.message, type: "error" });
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
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl flex items-center">
        <h2 className="text-xl font-semibold">Edit Video</h2>
      </div>

      <form onSubmit={handleUpdate} className="mt-5">
        {/* Video Title */}
        <input
          type="text"
          placeholder="Judul Video"
          className="input text-black input-bordered w-full mb-5 bg-white"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />

        {/* Category */}
        <div className="mb-5">
          <label htmlFor="category" className="block text-black text-sm font-semibold mb-2">
            Pilih Kategori
          </label>
          <select
            id="category"
            className="select text-black select-bordered w-full bg-white"
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

        {/* Quill.js Editor Video Description */}
        <ReactQuill
          value={videoDescription}
          onChange={setVideoDescription}
          className="mb-5 text-black"
          theme="snow"
          placeholder="Deskripsi Video"
        />

        {/* Video Upload */}
        <div className="mb-5">
          <label htmlFor="video" className="block text-black text-sm font-semibold mb-2 bg-white">
            Upload Video
          </label>
          {existingVideo && (
            <div className="mb-2">
              <p className="text-sm text-black">Video saat ini:</p>
              <video
                controls
                src={`http://localhost:4000${existingVideo}`}
                alt="Existing"
                className="w-40 h-24 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            id="video"
            className="file-input text-black file-input-bordered w-full bg-white"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-5">
          <label htmlFor="thumbnail" className="block text-black text-sm font-semibold mb-2">
            Upload Thumbnail
          </label>
          {existingThumbnail && (
            <div className="mb-2">
              <p className="text-sm text-black">Thumbnail saat ini:</p>
              <img
                src={`http://localhost:4000${existingThumbnail}`}
                alt="Existing Thumbnail"
                className="w-40 h-24 object-cover rounded-md bg-white"
              />
            </div>
          )}
          <input
            type="file"
            id="thumbnail"
            className="file-input text-black file-input-bordered w-full bg-white"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[#055941] text-white w-40 mx-auto">
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
