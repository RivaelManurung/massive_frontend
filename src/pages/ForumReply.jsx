import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // Import react-quill
import "react-quill/dist/quill.snow.css"; // Import the default styles for react-quill

const Reply = () => {
  const { id } = useParams(); // Get the discussion ID from the URL
  const navigate = useNavigate(); // Use navigate for navigation
  const [replyContent, setReplyContent] = useState(""); // State to hold reply content
  const [discussion, setDiscussion] = useState(null); // State to hold the original discussion data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [users, setUsers] = useState([]); // State to hold users

  // Fetch the original discussion by ID
  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/forum/${id}`);
        setDiscussion(response.data);
      } catch (err) {
        console.error("Error fetching discussion:", err);
        setError("Failed to load discussion. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDiscussion();
    fetchUsers();
  }, [id]);

  // Fetch the logged-in user's profile info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:4000/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to reply");
      return;
    }

    if (!replyContent.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:4000/replies/${id}`,
        { content: replyContent.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reply submitted successfully");
      navigate(`/forum/${id}/reply`);
    } catch (err) {
      console.error("Error submitting reply:", err);
      alert("There was an error submitting your reply. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading discussion...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Forum Discussion</h1>

      {/* Original Discussion */}
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-bold text-black">{discussion.title}</h2>
        <p
          className="text-lg text-gray-700 mt-2"
          dangerouslySetInnerHTML={{ __html: discussion.content }}
        ></p>
        <div className="mt-4">
          <h3 className="font-semibold">Keywords:</h3>
          <div className="flex flex-wrap gap-2">
            {discussion.keywords && discussion.keywords.length > 0 ? (
              discussion.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                No keywords available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Replies Section */}
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-3xl mb-8">
        <h2 className="text-xl font-bold mb-4">Balasan</h2>
        {discussion.replies && discussion.replies.length > 0 ? (
          discussion.replies.map((reply) => (
            <div
              key={reply.id}
              className="border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0"
            >
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-8 h-8 bg-black rounded-full mr-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-800 font-semibold">
                    {getUserNameById(reply.userId)}
                  </p>

                  {/* This is where you display the reply content with raw HTML */}
                  <div
                    className="reply-content text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: reply.content, // Assuming reply.content contains raw HTML
                    }}
                  />

                  <small className="text-gray-500">
                    Posted on {new Date(reply.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            Belum ada balasan. Jadilah yang pertama membalas!{" "}
          </p>
        )}
      </div>

      {/* Reply Form with ReactQuill */}
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Balasan kamu</h2>
        <ReactQuill
          value={replyContent}
          onChange={setReplyContent}
          className="border border-gray-300 rounded-md w-full min-h-[100px] mb-4 bg-white text-black" // Removed fixed height, set min-height
          placeholder="Type your reply here..."
        />
        <button
          onClick={handleReplySubmit}
          className="bg-[#055941] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Submit Balasan
        </button>
      </div>
    </div>
  );
};

export default Reply;
