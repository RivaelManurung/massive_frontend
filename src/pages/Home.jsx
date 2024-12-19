import React, { useEffect } from "react";
import {
  FaUsers,
  FaLeaf,
  FaSeedling,
  FaBookReader,
  FaVideo,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";
import farmImage from "../assets/images-1.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,    
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f0e6]">
      {/* Hero Section */}
      <div
        className="hero min-h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${farmImage})`,
        }}
        data-aos="fade-in"
      >
        <div className="hero-overlay bg-opacity-50 bg-[#355e3b]"></div>
        <div
          className="hero-content flex-col lg:flex-row gap-8 text-white"
          data-aos="fade-up"
        >
          <div className="lg:w-1/2">
            <img
              src={farmImage}
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover hover:scale-105 transition duration-300"
              alt="Agriculture"
              data-aos="zoom-in"
            />
          </div>
          <div
            className="lg:w-1/2 text-center lg:text-left"
            data-aos="fade-left"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Belajar Pertanian{" "}
              <span className="text-[#a8e063]">Untuk Masa Depan</span>
            </h1>
            <p className="py-6 text-lg">
              Tingkatkan produktivitas pertanian Anda dengan teknologi modern
              dan praktik terbaik untuk keberlanjutan yang lebih baik.
            </p>
            <Link to="/article">
              <button className="btn bg-[#a8e063] text-black btn-lg px-6 rounded-full shadow-md hover:bg-green-500">
                Mulai Belajar <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#f9f5eb]" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#355e3b] mb-2">
              Fitur Unggulan
            </h2>
            <p className="text-xl font-semibold text-[#2d4739]">
              Temukan cara terbaik untuk belajar dan bertani dengan teknologi
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            data-aos="fade-up"
          >
            {/* Artikel */}
            <FeatureCard
              title="Artikel Terbaru"
              description="Informasi dan wawasan terbaru untuk menunjang pengetahuan pertanian Anda."
              icon={<FaBookReader />}
              link="/article"
            />

            {/* Video */}
            <FeatureCard
              title="Video Pembelajaran"
              description="Tutorial video yang interaktif dan memudahkan pembelajaran."
              icon={<FaVideo />}
              link="/videos"
            />

            {/* Forum */}
            <FeatureCard
              title="Forum Diskusi"
              description="Berdiskusi, berbagi pengalaman, dan menemukan solusi bersama komunitas."
              icon={<FaUsers />}
              link="/forum"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#355e3b] mb-2">
              Apa Kata Petani?
            </h2>
            <p className="text-xl font-semibold text-[#2d4739]">
              Cerita Inspirasi dari Komunitas
            </p>
          </div>

          <div
            className="flex overflow-x-scroll space-x-6 pb-4 scrollbar-hidden"
            data-aos="zoom-in"
          >
            {[...Array(5)].map((_, index) => (
              <TestimonialCard key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, link }) => (
  <div
    className="card bg-white shadow-xl hover:shadow-2xl transition-all p-6 rounded-lg"
    data-aos="fade-up"
  >
    <div className="w-16 h-16 mask mask-squircle bg-[#355e3b] flex items-center justify-center mb-4 text-white">
      {icon}
    </div>
    <h3 className="card-title text-xl font-semibold text-[#355e3b]">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <div className="card-actions justify-end">
      <Link to={link}>
        <button className="btn bg-[#a8e063] text-black btn-sm rounded-full hover:bg-green-500">
          Selengkapnya
        </button>
      </Link>
    </div>
  </div>
);

const TestimonialCard = ({ index }) => {
  const testimonials = [
    {
      text: `"Dengan platform ini, saya belajar teknik baru yang meningkatkan hasil panen saya."`,
      name: "Budi, Petani Padi",
    },
    {
      text: `"Komunitasnya sangat membantu, banyak ilmu dan pengalaman yang dibagikan."`,
      name: "Siti, Petani Sayur",
    },
    {
      text: `"Panduan praktiknya sangat jelas dan mudah diterapkan di lapangan."`,
      name: "Andi, Petani Buah",
    },
    {
      text: `"Saya jadi lebih memahami cara merawat tanaman agar lebih produktif."`,
      name: "Tono, Petani Cabai",
    },
    {
      text: `"Dukungan dari komunitas sangat membantu saya menghadapi tantangan sehari-hari."`,
      name: "Dewi, Petani Buah",
    },
  ];

  return (
    <div
      className="min-w-[300px] card bg-white shadow-lg rounded-lg p-6"
      data-aos="fade-up"
    >
      <FaQuoteLeft className="text-[#a8e063] text-3xl mb-4" />
      <p className="text-gray-700 italic mb-4">{testimonials[index].text}</p>
      <div className="text-right text-gray-800 font-semibold">
        — {testimonials[index].name}
      </div>
    </div>
  );
};

export default Home;
