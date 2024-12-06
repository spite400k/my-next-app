'use client'

import React from 'react';

const Sidebar = () => {
    return (
      <nav className="w-64 bg-gray-800 text-white p-4">
        <ul>
          <li className="mb-2">
            <a href="#home" className="block py-2 px-4 rounded hover:bg-gray-700">Home</a>
          </li>
          <li className="mb-2">
            <a href="#about" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
          </li>
          <li className="mb-2">
            <a href="#services" className="block py-2 px-4 rounded hover:bg-gray-700">Services</a>
          </li>
          <li className="mb-2">
            <a href="#contact" className="block py-2 px-4 rounded hover:bg-gray-700">Contact</a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;