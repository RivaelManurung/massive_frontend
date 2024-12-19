// const Footer = () => (
//     <footer className="footer footer-center p-4 bg-base-200 text-base-content">
//       <div>
//         <p>Copyright © 2024 - All right reserved by MyBlog</p>
//       </div>
//     </footer>
//   );
  
//   export default Footer;

import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => (
  <footer style={{ backgroundColor: '#055941' }} className="w-full text-white p-4 flex justify-between items-center">
    {/* Left Section - Copyright */}
    <div className="text-sm">
      <p>Copyright © 2024 All right Reserved by AgriLearn</p>
    </div>

    {/* Center Section - Social Media and Contact Information */}
    <div className="flex gap-8">
      {/* Social Media Section */}
      <div className="text-center">
        <p className="font-semibold">Ikuti Kami:</p>
        <div className="flex gap-4 justify-center mt-1">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-600 text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 text-lg" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-lg" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-800 text-lg" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-black text-lg" />
          </a>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="text-center">
        <p className="font-semibold">Hubungi Kami:</p>
        <a href="https://wa.me/6282281061610" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-1">
          <FaWhatsapp className="text-green-500 text-lg" />
          <span className="text-sm">+6282281061610</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
