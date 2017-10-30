import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import * as styles from './style.css';

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
