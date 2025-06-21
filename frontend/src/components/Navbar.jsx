import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo + Tag */}
        <div className="logo-container" tabIndex={0} aria-label="JPForge logo">
          <div className="logo-main">
            JP<span className="logo-accent">Forge</span>
          </div>
          <div className="logo-subtext">Code. Build. Forge your ideas.</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
