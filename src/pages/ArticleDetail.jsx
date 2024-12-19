import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/artikel/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    };

    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/artikel?_limit=5&_sort=createdAt&_order=desc"
        );
        setLatestArticles(response.data);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/categoryArtikel"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchArticleDetail();
    fetchLatestArticles();
    fetchCategories();
  }, [id]);

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Belum Kategori";
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto bg-gray-50 rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
      >
        Back to Articles
      </button>

      <h1 className="text-4xl font-bold mb-4 text-black">
        {article.title || "No Title"}
      </h1>
      <div className="text-gray-600 text-sm mb-6">
        <span>
          Di publish pada:{" "}
          {article.createdAt ? formatDate(article.createdAt) : "Unknown Date"}
        </span>{" "}
        |
        <span className="font-semibold ml-2">
          Category: {getCategoryName(article.categoryArtikelId)}
        </span>
      </div>

      {/* Article Image */}
      {article.imageUrl && (
        <img
          src={`http://localhost:4000${article.imageUrl}`}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
        />
      )}

      {/* Article Content */}
      <div className="text-lg mb-4 text-black">
        {/* Display content with dangerouslySetInnerHTML */}
        <div
          dangerouslySetInnerHTML={{
            __html: article.description || "No content available",
          }}
        />
      </div>

      {/* Latest Articles Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Artikel Terbaru
        </h2>
        <div className="flex overflow-x-auto gap-8 pb-4">
          {latestArticles.slice(0, 5).map((latestArticle) => (
            <div
              key={latestArticle.id}
              className="flex-none card p-4 bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer rounded-lg w-60"
              onClick={() => handleArticleClick(latestArticle.id)}
            >
              <figure>
                <img
                  src={`http://localhost:4000${latestArticle.imageUrl}`}
                  alt={latestArticle.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body mt-4">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {latestArticle.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(latestArticle.createdAt)}
                </p>
                <div
                  className="text-black mt-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      article.description?.slice(0, 100) ||
                      "No description available",
                  }}
                ></div>
                <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {getCategoryName(latestArticle.categoryArtikelId)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
