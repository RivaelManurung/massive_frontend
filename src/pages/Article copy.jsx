import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../components/FormatDate"; 

const ARTICLES_API_URL = "http://localhost:4000/artikel";
const CATEGORIES_API_URL = "http://localhost:4000/categoryArtikel";

const itemsPerPage = 10;

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
    const title = (article.judul || "").toLowerCase().trim();
    const matchesSearch = title.includes(searchTerm.toLowerCase().trim());
    const matchesCategory =
      selectedCategory === "Semua" || article.categoryArtikelId === selectedCategory;
    return matchesSearch && matchesCategory;
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
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    if (category === "Semua") {
      setSelectedCategory("Semua");
    } else {
      const categoryId = categories.find((cat) => cat.name === category)?.id;
      setSelectedCategory(categoryId || "Semua");
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto customGray">
      <div className="mb-8 flex items-center border border-gray-300 rounded bg-white">
        <span className="p-2"></span>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full bg-[#F3F3F3] text-black placeholder-gray-500 rounded-r-lg"
        />
      </div>

      <div className="mb-8 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-black">Kategori</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="btn border border-black"
              style={{
                backgroundColor:
                  selectedCategory === category.id ? "#09734C" : "rgba(9, 115, 76, 0.22)",
                color: selectedCategory === category.id ? "white" : "black",
              }}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
          <p className="text-black">Tidak ada artikel untuk kategori ini!</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className={`btn ${currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"} border border-black`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`btn ${currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white"} border border-black`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const ArticleCard = ({ article, categories, onClick }) => {
  const imageUrl = `http://localhost:4000${article.imageUrl}`;
  const { judul, createdAt, description, categoryArtikelId } = article;

  const formattedDate = formatDate(createdAt);

  const category = categories.find((cat) => cat.id === categoryArtikelId);
  const categoryName = category ? category.name : "Unknown Category";

  const truncatedDescription = (description && description.length > 100)
    ? description.slice(0, 100) + "..."
    : description || "No description available";

  return (
    <div
      className="card shadow-md transition-transform transform hover:scale-105 cursor-pointer"
      style={{ backgroundColor: "white", color: "black" }}
      onClick={() => onClick(article.id)}
    >
      <figure>
        <img
          src={imageUrl}
          alt={judul || "Article Image"}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <p className="text-sm text-black">{formattedDate}</p>
        <h3 className="text-xl font-semibold mt-2 text-black">{judul}</h3>
        <p className="text-black mt-2">{truncatedDescription}</p>

        <div className="card-actions mt-2">
          {categoryArtikelId && (
            <span
              className="badge mr-2"
              style={{
                backgroundColor: "rgba(9, 115, 76, 0.22)",
                color: "black",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {categoryName}
            </span>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <a href="#" className="text-teal-500 hover:text-teal-600">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
