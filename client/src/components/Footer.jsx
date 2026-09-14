import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-400 text-2xl" />
              <h3 className="text-xl font-bold">KisanBazar</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Empowering local farmers by eliminating middlemen. Direct Farmer-to-Consumer e-commerce platform built with Node.js, Express, MongoDB, and React.
            </p>
            {/* Social / Developer Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2.5 rounded-full text-gray-300 hover:text-green-400 hover:bg-gray-700 transition"
                title="Developer GitHub Profile"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2.5 rounded-full text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition"
                title="Developer LinkedIn Profile"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Farmers", path: "/farmers" },
                { name: "About Us", path: "/about" },
                { name: "Pricing", path: "/pricing" }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-green-400 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact & Developer Info
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" />
                <span>India - Agri-Tech Final Year Capstone Project</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-400 flex-shrink-0" />
                <span>support@kisanbazar.org</span>
              </li>
              <li className="flex items-center gap-3">
                <FaGithub className="text-green-400 flex-shrink-0" />
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub Repository
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-blue-400 flex-shrink-0" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe for updates on fresh organic produce and local farmer stories.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-green-600 transition shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-xs flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {currentYear} KisanBazar. Direct Farmer-to-Consumer AgriTech Platform.</p>
          <p className="text-gray-400">Developed with ❤️ for B.Tech Final Year Portfolio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
