import React from 'react';
import { FaTags, FaFileAlt, FaVideo, FaComments } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">Dashboard Utama</h2>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            title="Kategori Artikel" 
            description="Kelola kategori artikel dengan mudah." 
            icon={<FaTags className="text-white text-2xl" />}
          />
          <Card 
            title="Artikel" 
            description="Tambahkan dan kelola artikel baru." 
            icon={<FaFileAlt className="text-white text-2xl" />}
          />
          <Card 
            title="Kategori Video" 
            description="Atur kategori video dengan cepat." 
            icon={<FaTags className="text-white text-2xl" />}
          />
          <Card 
            title="Video" 
            description="Tambahkan dan kelola video edukasi." 
            icon={<FaVideo className="text-white text-2xl" />}
          />
          <Card 
            title="Forum" 
            description="Kelola forum diskusi dan komunitas." 
            icon={<FaComments className="text-white text-2xl" />}
          />
        </div>
      </main>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, description, icon }) => {
  return (
    <div className="card bg-gradient-to-r from-green-500 to-green-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="card-body text-white">
        <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-25 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="card-title text-2xl mb-2">{title}</h3>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-white btn-outline btn-sm hover:bg-white hover:text-green-700">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
