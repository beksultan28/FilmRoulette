/** @module containers */

import React from 'react';
import { Link } from 'react-router-dom';

import { ConnectedSearchForm, ConnectedResultsList } from '../connectors';
import FooterComponent from '../components/footer/index.jsx';


/**
 * SearchContainer component
 */
const SearchContainer = () => (
  <div className="page-content">
    <div className="search-block">
      <div className="header">
        <div className="container wrapper">
          <Link to="/" className="logo">FilmRoulette</Link>
          <ConnectedSearchForm />
          {/* .search-form */}
        </div>
      </div>
      {/* .header */}
      <div className="search-results">
        <ConnectedResultsList
          title="count"/>
      </div>
      {/* .search-results */}
    </div>
    {/* .search-block */}
    <FooterComponent/>
    {/* .footer */}
  </div>
);

export default SearchContainer;
