/** @module components */

import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

/**
 * Search result item compenent
 * 
 * @export
 */
const ResultsItemComponent = props => (
  <div className="result-item">
    <Link to={`/film/${props.searchBy}/${props.item.id}`}
      className="result-content">
      <div className="result-img">
        <img src={`http://image.tmdb.org/t/p/w342${props.item.poster_path}`} alt="" />
      </div>
      <div className="result-title">
        {props.item.title}
      </div>
      <div className="clearfix">
        <small className="label label-default pull-left">IMDB: {props.item.vote_average}</small>
        <span className="label label-default pull-right">{props.item.release_date}</span>
      </div>
    </Link>
  </div>
);

export default ResultsItemComponent;
