/** @module components */

import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

/**
 * Footer component
 */
const FooterComponent = () => (
  <div className="footer">
    <div className="container">
      <Link to="/" className="logo">FilmRoulette</Link>
    </div>
  </div>
);

export default FooterComponent;
