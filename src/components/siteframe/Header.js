import React from 'react';
import {  FaHome, FaTools, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header() {
    return ( 
    <header className="header">
        <div className='left-section'>
            <FaTools className="react-icon" />
            <h1 className="header-title"> DevTools</h1>
        </div>
        <nav className="nav-menu">
        <Link to="/" className="nav-item"><FaHome /> Home</Link>
        <Link to="/" className="nav-item"><FaTools /> Tools</Link>
        <Link to="mailto:manojpb@klizer.com" target="_blank" className="nav-item"><FaQuestionCircle /> Help</Link>
        </nav>
  </header>);
}

export default Header;