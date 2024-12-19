import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchArticlesAndCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get("http://localhost:4000/artikel"),
        axios.get("http://localhost:4000/categoryArtikel"),
      ]);
      setArticles(articlesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setShowDeletePopup(true);
    setArticleToDelete(id);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setArticleToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:4000/artikel/${articleToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setArticles(articles.filter((article) => article.id !== articleToDelete));
      showNotification("Artikel berhasil dihapus!", "success");
    } catch (error) {
      console.error("Failed to delete article:", error);
      showNotification("Gagal menghapus artikel, coba lagi.", "error");
    } finally {
      cancelDelete();
    }
  };

  const truncateDescription = (description) => {
    const sentences = description.split(". ");
    const truncated = sentences.slice(0, 3).join(". ");
    return truncated + (sentences.length > 3 ? "..." : "");
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
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
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
        <h2 className="text-lg font-semibold">Artikel</h2>
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate("/add-article")}
          className="bg-[#055941] text-white py-2 px-4 rounded-lg shadow hover:bg-[#044c37]"
        >
          + Tambah Artikel
        </button>
      </div>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <table className="w-full mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-[#055941] text-white">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Kategori</th>
            <th className="py-2 px-4 text-left">Judul</th>
            <th className="py-2 px-4 text-left">Isi</th>
            <th className="py-2 px-4 text-left">Gambar</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            articles.map((article, index) => {
              const category =
                categories.find((cat) => cat.id === article.categoryArtikelId)
                  ?.name || "No Category";
              return (
                <tr key={article.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 text-black">{category}</td>
                  <td className="py-2 px-4 text-black">{article.title}</td>
                  <td
                    className="py-2 px-4 text-black"
                    dangerouslySetInnerHTML={{
                      __html: truncateDescription(article.description),
                    }}
                  ></td>

                  <td className="py-2 px-4">
                    {article.imageUrl ? (
                      <img
                        src={`http://localhost:4000${article.imageUrl}`}
                        alt="Article"
                        className="w-24 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-article/${article.id}`)}
                      className="bg-blue-500 text-white py-1 px-2 rounded shadow hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(article.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;
