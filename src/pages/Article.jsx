import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../components/FormatDate";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ARTICLES_API_URL = "http://localhost:4000/artikel";
const CATEGORIES_API_URL = "http://localhost:4000/categoryArtikel";

const itemsPerPage = 6;

const BlogPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse, categoriesResponse] = await Promise.all([
          axios.get(ARTICLES_API_URL),
          axios.get(CATEGORIES_API_URL),
        ]);
        setArticles(articlesResponse.data);
        setCategories([
          { id: "Semua", name: "Semua" },
          ...categoriesResponse.data.map((cat) => ({ id: cat.id, name: cat.name })),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const title = (article.title || "").toLowerCase().trim();
    const matchesSearch = title.includes(searchTerm.toLowerCase().trim());
    return matchesSearch && (selectedCategory === "Semua" || article.categoryArtikelId === selectedCategory);
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (category) => {
    const categoryId = categories.find((cat) => cat.name === category)?.id || "Semua";
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
    <div className="p-8 max-w-screen-lg mx-auto customGray">
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
      <h2 className="text-4xl text-black font-semibold mb-4">Categories Articles</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              categories={categories}
              onClick={handleArticleClick}
            />
          ))
        ) : (
          <p className="text-center text-xl">No articles found for this category.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            className="btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

const ArticleCard = ({ article, categories, onClick }) => {
  const imageUrl = `http://localhost:4000${article.imageUrl}`;
  const formattedDate = formatDate(article.createdAt);
  const category = categories.find((cat) => cat.id === article.categoryArtikelId)?.name || "N/A";

  return (
    <div
      className="card p-6 shadow-lg rounded-lg transition hover:scale-105 transform cursor-pointer bg-white"
      onClick={() => onClick(article.id)}
    >
      <figure>
        <img
          src={imageUrl}
          alt={article.title || "Article Image"}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </figure>
      <div>
        <h3 className="text-2xl text-gray-800 font-semibold mb-2">{article.title}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <div
          className="text-lg mt-2 text-black"
          dangerouslySetInnerHTML={{
            __html:
            article.description?.slice(0, 100) || "No description available",
          }}
        ></div>
        
        <div className="mt-4 flex items-center">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">{category}</span>
          <a
            href="#"
            className="ml-auto text-blue-500 hover:underline"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
