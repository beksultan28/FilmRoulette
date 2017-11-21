/** @module containers */

import React from 'react';
import { Link } from 'react-router-dom';

import { ConnectedDetail, ConnectedResultsList } from '../connectors';
import FooterComponent from '../components/footer/index.jsx';


/**
 * DetailContainer component
 */
const DetailContainer = () => (
  <div className="page-content">
    <div className="detail-block">
      <div className="header">
        <div className="container wrapper">
          <Link to="/" className="logo">FilmRoulette</Link>

          <div className="pull-right">
            <Link to="/search" className="btn btn-light go-home">Search</Link>
          </div>

          <ConnectedDetail/>
        </div>
      </div>
      {/* .header */}
      <div className="search-results">
        <ConnectedResultsList
          title="detail"/>
      </div>
      {/* .search-results */}
    </div>
    {/* .search-block */}
    <FooterComponent/>
    {/* .footer */}
  </div>
);

export default DetailContainer;
