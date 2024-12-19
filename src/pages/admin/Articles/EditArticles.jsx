import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // Ambil token

  // Fetch forum and replies on component mount
  useEffect(() => {
    const fetchForumAndReplies = async () => {
      try {
        const [forumResponse, repliesResponse] = await Promise.all([
          axios.get(`http://localhost:4000/forum/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, // Tambahkan token
          }),
          axios.get(`http://localhost:4000/replies/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, // Tambahkan token
          }),
        ]);

        setForum(forumResponse.data);
        setReplies(repliesResponse.data);
      } catch (error) {
        setError("An error occurred while fetching the forum or replies.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchForumAndReplies();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedForum = {
        title: forum.title,
        content: forum.content,
        keywords: forum.keywords,
      };
      await axios.put(`http://localhost:4000/forum/${id}`, updatedForum, {
        headers: { Authorization: `Bearer ${token}` }, // Tambahkan token
      });
      alert("Forum updated successfully!");
      navigate("/forums"); // Navigasi ke halaman forum
    } catch (error) {
      setError("Failed to update forum.");
      console.error(error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await axios.delete(`http://localhost:4000/reply/${replyId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Tambahkan token
      });
      setReplies(replies.filter((reply) => reply._id !== replyId));
      alert("Reply deleted successfully");
    } catch (error) {
      alert("Failed to delete reply.");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-black">Edit Forum</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-black">Title:</label>
          <input
            type="text"
            value={forum.title}
            onChange={(e) => setForum({ ...forum, title: e.target.value })}
            className="w-full p-2 border border-black rounded bg-white text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Content:</label>
          <textarea
            value={forum.content}
            onChange={(e) => setForum({ ...forum, content: e.target.value })}
            className="w-full p-2 border border-black rounded bg-white text-black"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-black">Keywords:</label>
          <input
            type="text"
            value={forum.keywords.join(", ")}
            onChange={(e) =>
              setForum({ ...forum, keywords: e.target.value.split(",") })
            }
            className="w-full p-2 border border-black rounded bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Update Forum
        </button>
      </form>

      <h3 className="text-xl font-semibold text-black mt-5">Replies</h3>
      <table className="table w-full mt-5">
        <thead>
          <tr>
            <th className="text-black">Reply</th>
            <th className="text-black">User</th>
            <th className="text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {replies.map((reply) => (
            <tr key={reply._id}>
              <td
                className="py-2 px-4 text-black"
                dangerouslySetInnerHTML={{ __html: reply.content }} // Render reply content as HTML
              />
              <td
                className="py-2 px-4 text-black"
                dangerouslySetInnerHTML={{ __html: reply.userId.name }} // Render user name as HTML
              />
              <td>
                <button
                  onClick={() => handleDeleteReply(reply._id)}
                  className="btn bg-red-500 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditForum;
