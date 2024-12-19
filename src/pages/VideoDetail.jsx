import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa"; // Importing the play icon

const VideoDetail = () => {
  const { id } = useParams(); // Get video ID from URL params
  const [video, setVideo] = useState(null);
  const [latestVideos, setLatestVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing
  const navigate = useNavigate();

  // Format date to display it properly
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  // Fetch video detail, latest videos, and categories
  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/videoTutorial/${id}`
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video detail:", error);
      }
    };

    const fetchLatestVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/videoTutorial?_limit=5&_sort=createdAt&_order=desc"
        );
        setLatestVideos(response.data);
      } catch (error) {
        console.error("Error fetching latest videos:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categoryVideo");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchVideoDetail();
    fetchLatestVideos();
    fetchCategories();
  }, [id]);

  // Handle click on latest videos
  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  // Get category name by category ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No Category"; // Fallback if undefined category
  };

  // Handle play button click
  const handlePlayClick = () => {
    setIsPlaying(true); // Set isPlaying to true when play button is clicked
  };

  // Check if video data is loaded
  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      {/* Video Detail */}
      <h1 className="text-4xl font-bold mb-4 text-black">
        {video.title || "No Title"}
      </h1>
      <div className="text-gray-600 text-sm mb-6">
      Di publish pada:{" "}
        {video.createdAt ? formatDate(video.createdAt) : "Unknown Date"} |
        Category:{" "}
        <span className="font-semibold">
          {getCategoryName(video.categoryVideoId)}
        </span>
      </div>

      {/* Video Embed */}
      <div className="relative mb-6">
        {!isPlaying ? (
          <div
            className="w-full h-96 bg-gray-300 rounded-md shadow cursor-pointer flex items-center justify-center"
            onClick={handlePlayClick} // Trigger play when thumbnail is clicked
          >
            <FaPlay className="text-white text-4xl" />
          </div>
        ) : (
          <iframe
            className="w-full h-96 rounded-md shadow"
            src={`http://localhost:4000${video.videoUrl}`}
            title={video.title}
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Video Description */}
      <div
        className="text-lg mb-4 text-black"
        dangerouslySetInnerHTML={{
          __html: video.description || "No description available",
        }}
      ></div>

      {/* Latest Videos Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Latest Videos
        </h2>
        <div className="flex overflow-x-auto gap-8">
          {latestVideos.slice(0, 5).map((latestVideo) => (
            <div
              key={latestVideo.id}
              className="card shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "white",
                color: "black",
                minWidth: "250px",
              }}
              onClick={() => handleVideoClick(latestVideo.id)}
            >
              <figure className="relative">
                <img
                  src={`http://localhost:4000${latestVideo.thumbnailUrl}`}
                  alt={latestVideo.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                {/* Play Icon on Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold text-black">
                  {latestVideo.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(latestVideo.createdAt)}
                </p>
                <div
                  className="text-black mt-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      video.description?.slice(0, 100) ||
                      "No description available",
                  }}
                ></div>
                <div className="card-actions mt-4">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "rgba(9, 115, 76, 0.22)",
                      color: "black",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {getCategoryName(latestVideo.categoryVideoId)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
