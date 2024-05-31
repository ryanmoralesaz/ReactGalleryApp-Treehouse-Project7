// src/components/Nav.jsx
import React from "react";
import { NavLink } from "react-router-dom";

// passthrough the click handler as a destructured prop
const Nav = ({ onClick }) => {
  const handleClick = (query) => {
    onClick(query);
  };
  return (
    // set up the three default search buttons and pass the click handler as a prop
    <nav className="main-nav">
      <ul>
        <li>
          {/* set up the three default NavLink buttons for finding the default search queries */}
          <NavLink
            to="/search/cats"
            onClick={() => {
              handleClick("cats");
            }}
          >
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search/dogs"
            onClick={() => {
              handleClick("dogs");
            }}
          >
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search/computers"
            onClick={() => {
              handleClick("computers");
            }}
          >
            Computers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
