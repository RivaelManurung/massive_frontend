import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryArtikelId, setCategoryArtikelId] = useState(1); // Default to category ID 1
  const [categories, setCategories] = useState([]); // State for categories
  const [image, setImage] = useState(null); // State for image
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categoryArtikel"); // Adjust the URL as needed
        setCategories(response.data); // Assume response is an array of categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
  
    if (!title || !description) {
      alert("Judul dan deskripsi tidak boleh kosong!");
      return;
    }
  
    const formData = new FormData();
    formData.append("judul", title); // Pastikan sesuai dengan backend
    formData.append("deskripsi", description); // Pastikan sesuai dengan backend
    formData.append("categoryArtikelId", categoryArtikelId);
    if (image) formData.append("imageUrl", image);
  
    // Debug FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.post("http://localhost:4000/artikel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/articles");
    } catch (error) {
      console.error("Failed to create article:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      }
    }
  };
  

  return (
    <div className="p-5 font-sans">
      <div className="w-full max-w-screen-lg bg-[#055941] text-white p-4 rounded-xl mx-auto">
        <h2 className="text-xl font-semibold">Tambah Artikel</h2>
      </div>

      <form onSubmit={handleCreate} className="mt-5">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Judul Artikel"
          className="input input-bordered w-full mb-5 text-black bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category Selection */}
        <div className="mb-5">
          <label htmlFor="category" className="block text-sm font-semibold mb-2 text-black">
            Pilih Kategori
          </label>
          <select
            id="category"
            className="select select-bordered w-full text-black bg-white"
            value={categoryArtikelId}
            onChange={(e) => setCategoryArtikelId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} {/* Assuming category has 'id' and 'name' */}
              </option>
            ))}
          </select>
        </div>

        {/* Quill.js Editor for Description */}
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-5 text-black"
          theme="snow"
          placeholder="Deskripsi Artikel"
        />

        {/* Image Upload */}
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm font-semibold mb-2 text-black">
            Upload Gambar
          </label>
          <input
            type="file"
            id="image"
            className="file-input file-input-bordered w-full text-black bg-white"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-[#055941] text-white w-40 mx-auto"
        >
          Tambah Artikel
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
