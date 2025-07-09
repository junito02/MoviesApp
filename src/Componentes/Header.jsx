import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Img/Logo-primario.png";

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-gradient-to-r from-gray-900 to-blue-950 shadow-lg sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-blue-400">Movies-App</span>
        </div>
        <ul className="flex gap-6 text-white font-medium">
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-400 transition-colors"
              }
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
