// src/components/Nav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ onSearch }) => {
  const handleClick = (query) => { 
    onSearch(query);
  }
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink
            to='/search/cats'
            onClick={() => {
              handleClick('cats');
            }}
          >
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/search/dogs'
            onClick={() => {
              handleClick('dogs');
            }}
          >
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/search/computers'
            onClick={() => {
              handleClick('computers');
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