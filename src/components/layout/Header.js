import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header flex items-center justify-center text-white py-10 gap-x-6">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movie"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movie
      </NavLink>
    </header>
  );
};

export default Header;
