import React from "react";
import {
  FaUsers,
  FaLeaf,
  FaSeedling,
  FaBookReader,
  FaVideo,
  FaArrowRight,
  FaQuoteLeft,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import farmImage from "../assets/images-1.jpg";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Install react-slick and slick-carousel for carousel functionality
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  // Settings for the testimonials carousel
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Settings for the latest articles carousel
  const articlesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // for large screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // for tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // for mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${farmImage})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900 opacity-50"></div>
        <div className="hero-content relative z-10 flex-col lg:flex-row-reverse gap-12 px-4">
          <div className="lg:w-1/2">
            <img
              src={farmImage}
              className="rounded-lg shadow-2xl w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              alt="Agriculture"
            />
          </div>
          <div className="lg:w-1/2 text-white flex flex-col justify-center">
            <div className="badge badge-success gap-2 mb-4 text-green-900 bg-white bg-opacity-20">
              <FaLeaf /> Platform Pembelajaran Pertanian
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              Belajar Pertanian{" "}
              <span className="text-green-400">Untuk Masa Depan</span>
            </h1>
            <p className="py-6 text-lg">
              Platform pembelajaran digital yang membantu petani meningkatkan
              produktivitas dan keberlanjutan pertanian melalui teknologi modern
              dan praktik terbaik.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/article">
                <button className="btn btn-green-400 btn-lg flex items-center">
                  Mulai Belajar <FaArrowRight className="ml-2" />
                </button>
              </Link>
              <Link to="/about">
                <button className="btn btn-outline btn-green-400 btn-lg flex items-center">
                  Tentang Kami <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img
                src={farmImage}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                alt="Tentang Kami"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Tentang Kami</h2>
              <p className="text-lg text-gray-700 mb-4">
                Kami adalah platform edukasi pertanian yang berkomitmen untuk
                mendukung petani di seluruh Indonesia dengan memberikan akses
                mudah ke informasi terkini, praktik terbaik, dan teknologi yang
                relevan. Di sini, petani dapat belajar, berbagi pengalaman, dan
                mengembangkan keterampilan yang dibutuhkan untuk mencapai
                pertanian yang lebih produktif dan berkelanjutan.
              </p>
              <Link to="/about">
                <button className="btn btn-green-400 btn-md flex items-center">
                  Pelajari Lebih Lanjut <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Fitur Unggulan</h2>
            <p className="text-4xl font-bold">Cara Lebih Baik untuk Belajar Pertanian</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Artikel */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaBookReader className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-green-600">Artikel Terbaru</h3>
                <p className="text-gray-700">
                  Konten artikel yang kaya informasi untuk menambah pengetahuan Anda.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/article">
                    <button className="btn btn-green-400 text-white btn-sm flex items-center">
                      Selengkapnya <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaVideo className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-green-600">Video Pembelajaran</h3>
                <p className="text-gray-700">
                  Video tutorial interaktif untuk pembelajaran yang lebih efektif.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/videos">
                    <button className="btn btn-green-400 text-white btn-sm flex items-center">
                      Selengkapnya <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Forum */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <div className="w-16 h-16 mask mask-squircle bg-green-600 flex items-center justify-center mb-4">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-green-600">Forum Diskusi</h3>
                <p className="text-gray-700">
                  Tempat berdiskusi, berbagi pengetahuan, dan pengalaman antar anggota.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/forum">
                    <button className="btn btn-green-400 text-white btn-sm flex items-center">
                      Selengkapnya <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Artikel Terbaru</h2>
            <p className="text-4xl font-bold">Update Informasi Pertanian</p>
          </div>

          <Slider {...articlesSettings}>
            {/* Replace these with actual article data */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="px-4">
                <div className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={farmImage}
                    className="rounded-t-lg h-48 w-full object-cover"
                    alt={`Artikel ${index + 1}`}
                  />
                  <div className="card-body">
                    <h3 className="card-title text-green-600">Judul Artikel {index + 1}</h3>
                    <p className="text-gray-700">
                      Ringkasan singkat dari artikel ini memberikan gambaran umum tentang topik yang dibahas.
                    </p>
                    <div className="card-actions justify-end">
                      <Link to="/article">
                        <button className="btn btn-green-400 text-white btn-sm flex items-center">
                          Baca Selengkapnya <FaArrowRight className="ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Apa Kata Petani?</h2>
            <p className="text-4xl font-bold">Cerita dan Inspirasi</p>
          </div>

          <Slider {...testimonialSettings}>
            {/* Testimonial Cards */}
            {[
              {
                quote:
                  "Dengan platform ini, saya belajar teknik baru yang meningkatkan hasil panen saya.",
                author: "Budi, Petani Padi",
              },
              {
                quote:
                  "Komunitasnya sangat membantu, banyak ilmu dan pengalaman yang dibagikan.",
                author: "Siti, Petani Sayur",
              },
              {
                quote:
                  "Panduan praktiknya sangat jelas dan mudah diterapkan di lapangan.",
                author: "Andi, Petani Buah",
              },
              {
                quote:
                  "Saya jadi lebih memahami cara merawat tanaman agar lebih produktif.",
                author: "Tono, Petani Cabai",
              },
              {
                quote:
                  "Dukungan dari komunitas sangat membantu saya menghadapi tantangan sehari-hari.",
                author: "Dewi, Petani Buah",
              },
            ].map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="card bg-white shadow-lg p-8 rounded-lg">
                  <FaQuoteLeft className="text-green-600 text-3xl mb-4" />
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 text-right text-gray-900 font-semibold">
                    — {testimonial.author}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Berlangganan Newsletter</h2>
              <p className="text-lg text-gray-200">
                Dapatkan update terbaru seputar pertanian langsung ke email Anda.
              </p>
            </div>
            <div className="lg:w-1/2">
              <form className="flex flex-col sm:flex-row items-center">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="input input-bordered w-full sm:w-auto flex-1 text-black mb-4 sm:mb-0"
                  required
                />
                <button className="btn btn-white text-green-600 sm:ml-4 flex items-center">
                  <FaEnvelope className="mr-2" /> Berlangganan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      

      
    </div>
  );
};

export default Home;
