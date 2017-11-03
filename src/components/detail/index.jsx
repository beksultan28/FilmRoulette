/** @module components */

import React, { Component } from 'react';

// eslint-disable-next-line no-unused-vars
import * as styles from './style.css';

/**
 * Shows film details
 * Performs search for recommendations
 * 
 * @export
 * @class DetailComponent
 * @extends {Component}
 */
export default class DetailComponent extends Component {
  componentWillMount() {
    /**
     * Parse url and get film
     */
    this.getFilm();
  }

  componentDidUpdate(prevProps) {
    /**
     * If film changed
     * search for recommendations
     */
    if (prevProps.detailItem !== this.props.detailItem) {
      const { id, searchBy } = this.props.match.params;
      this.props.getRecommendations(id, searchBy);
    }

    /**
     * If url changed
     * Parse url and get film
     * This needed for the case when user navigated through browser histor
     */
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getFilm();
    }
  }

  /**
   * Parses url and updates state
   * then performs search for film details with new states
   * 
   * @memberof DetailComponent
   */
  getFilm() {
    const { id, searchBy } = this.props.match.params;
    this.props.updateSearchBy(searchBy);
    this.props.getFilmById(id, searchBy);
  }

  /**
   * Converts genres array to the string
   * 
   * @param {Array} genres 
   * @returns {String}
   * @memberof DetailComponent
   */
  getCategoryList(genres) {
    if (!genres) {
      return '';
    }
    return genres.map(i => i.name).join(', ');
  }

  /**
   * Generates runtime string
   * 
   * @param {Object} item 
   * @returns {String}
   * @memberof DetailComponent
   */
  getRuntime(item) {
    if (item.runtime) {
      return `${item.runtime} min`;
    }
    if (item.number_of_episodes) {
      return `${item.number_of_episodes} episodes`;
    }
    return '';
  }

  render() {
    const item = this.props.detailItem;
    return item ? (
      <div className="detail">
        <div className="row">
          <div className="col-xs-4">
            <img src={`http://image.tmdb.org/t/p/w342${item.poster_path}`} alt="" className="detail-img" />
          </div>
          <div className="col-xs-7">
            <h2 className="detail-title">
              {item.title}
              &nbsp;<span className="badge">{item.vote_average} </span>
            </h2>
            <h3 className="detail-category">{this.getCategoryList(item.genres)}</h3>
            <div className="row detail-numbers">
              <div className="col-md-3">
                <b>{item.release_date}</b>
              </div>
              <div className="col-md-5">
                {this.getRuntime(item)}
              </div>
            </div>
            <div className="detail-description">
              {item.overview}
            </div>
            <div className="detail-extra">
              <a href={item.homepage} target="_blank">{item.homepage}</a>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
