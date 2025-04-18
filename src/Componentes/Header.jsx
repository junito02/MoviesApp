import React, { useState } from "react";
import logo from "../Img/Logo-primario.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-[#060d1e] to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={logo}
                alt="Logo"
              />
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Movies-App
              </h2>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/playing"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive("/playing")
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              Home
            </Link>
            <Link
              to="/popular"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive("/popular")
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              Popular
            </Link>
            <Link
              to="/upcoming"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive("/upcoming")
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              Upcoming
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95">
          <Link
            to="/playing"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
              isActive("/playing")
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/popular"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
              isActive("/popular")
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Popular
          </Link>
          <Link
            to="/upcoming"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
              isActive("/upcoming")
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Upcoming
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
