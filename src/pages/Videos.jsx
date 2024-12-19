import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../components/FormatDate"; // Assuming you have this function
import { FaPlay, FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const VIDEOS_API_URL = "http://localhost:4000/videoTutorial";
const CATEGORIES_API_URL = "http://localhost:4000/categoryVideo";

const itemsPerPage = 6;

const Videos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosResponse, categoriesResponse] = await Promise.all([
          axios.get(VIDEOS_API_URL),
          axios.get(CATEGORIES_API_URL),
        ]);
        setVideos(videosResponse.data);
        setCategories([
          { id: "Semua", name: "Semua" },
          ...categoriesResponse.data.map((cat) => ({
            id: cat.id,
            name: cat.name,
          })),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const title = (video.title || "").toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase().trim());
    return (
      matchesSearch &&
      (selectedCategory === "Semua" ||
        video.categoryVideoId === selectedCategory)
    );
  });

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  const handleCategouryChange = (category) => {
    const categoryId =
      categories.find((cat) => cat.name === category)?.id || "Semua";
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <div className="relative mb-8 flex items-center">
        <span className="p-2 text-gray-600">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input w-full bg-gray-100 p-4 text-lg rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-4xl text-black font-semibold mb-4">Categories Video</h2>
        <div className="flex space-x-4 overflow-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              categories={categories}
              onClick={handleVideoClick}
            />
          ))
        ) : (
          <p className="text-center text-xl">
            No videos found for this category.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

const VideoCard = ({ video, categories, onClick }) => {
  const imageUrl = `http://localhost:4000${video.thumbnailUrl}`;
  const formattedDate = formatDate(video.createdAt);
  const category =
    categories.find((cat) => cat.id === video.categoryVideoId)?.name || "N/A";

  return (
    <div
      className="card p-6 shadow-lg rounded-lg transition hover:scale-105 transform cursor-pointer bg-white"
      onClick={() => onClick(video.id)}
    >
      <figure className="relative">
        <img
          src={imageUrl}
          alt={video.title || "Video Thumbnail"}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FaPlay className="text-white text-4xl" />
        </div>
      </figure>
      <div>
        <h3 className="text-2xl text-gray-800 font-semibold mb-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <div
          className="text-lg mt-2 text-black"
          dangerouslySetInnerHTML={{
            __html:
              video.description?.slice(0, 100) || "No description available",
          }}
        ></div>

        <div className="mt-4 flex items-center">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            {category}
          </span>
          <a href="#" className="ml-auto text-blue-500 hover:underline">
            Watch Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;
