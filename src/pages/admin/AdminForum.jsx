import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminForum = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [forumToDelete, setForumToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get("http://localhost:4000/forum");
      console.log(response.data); // Menampilkan data yang diterima
      setForums(response.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setShowDeletePopup(true);
    setForumToDelete(id);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setForumToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/forum/${forumToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForums(forums.filter((forum) => forum.id !== forumToDelete));
    } catch (error) {
      console.error("Failed to delete forum:", error);
    } finally {
      cancelDelete();
    }
  };

  return (
    <div className="p-5 font-sans">
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus forum ini?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-[#055941] text-white p-4 rounded-lg flex items-center">
        <h2 className="text-lg font-semibold">Forum</h2>
      </div>
      {/* <div className="mt-4">
        <button
          onClick={() => navigate("/add-forum")}
          className="bg-[#055941] text-white py-2 px-4 rounded-lg shadow hover:bg-[#044c37]"
        >
          + Tambah Forum
        </button>
      </div> */}

      <table className="w-full mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-[#055941] text-white">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Judul</th>
            <th className="py-2 px-4 text-left">Topik Diskusi</th>
            <th className="py-2 px-4 text-left">Keywords</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            forums.map((forum, index) => (
              <tr key={forum.id} className="border-b">
                <td className="py-2 px-4 text-black">{index + 1}</td>
                <td className="py-2 px-4 text-black">{forum.title}</td> {/* Ganti dengan 'title' */}
                <td className="py-2 px-4 text-black" dangerouslySetInnerHTML={{ __html: forum.content }}></td>
                <td className="py-2 px-4 text-black">{forum.keywords.join(", ")}</td> {/* Ganti dengan 'keywords' */}
                <td className="py-2 px-4 text-black flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-forum/${forum.id}`)}
                    className="bg-blue-500 text-white py-1 px-2 rounded shadow hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(forum.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminForum;
