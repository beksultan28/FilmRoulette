import React, { Component } from 'react';
import { Field } from 'redux-form';
import 'url-search-params-polyfill';

// eslint-disable-next-line no-unused-vars
import * as styles from './style.css';


/**
 * Search form component
 * Performs search on search form submit,
 * state change and first load
 * 
 * @export
 * @class SearchFormComponent
 * @extends {Component}
 */
export default class SearchFormComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchBy = this.handleSearchBy.bind(this);
  }

  componentWillMount() {
    /**
     * Parse url and update states
     * This needed for the case when page is refreshed
     * or application opened by link to the search page(/search/some-search-query)
     */
    this.updateRequest();
  }

  componentDidUpdate(prevProps) {
    /**
     * If search query is empty clear search results
     */
    if (this.props.searchQuery !== prevProps.searchQuery
        && this.props.searchQuery === '') {
      this.props.searchFilms('');
    }

    /**
     * If location changed parse url and update states
     * This needed for the case when user navigated through browser history
     */
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.updateRequest();
    }
  }

  /**
   * Parses url and updated states
   * then performs search for films with new states
   * 
   * @memberof SearchFormComponent
   */
  updateRequest() {
    let searchQuery = window.location.pathname.split('/')[2];
    let searchBy = new URLSearchParams(window.location.search).get('searchBy');

    searchQuery = searchQuery ? decodeURI(searchQuery) : '';
    searchBy = searchBy || 'movie';

    this.props.updateQuery(searchQuery);
    this.props.updateSearchBy(searchBy);
    this.props.searchFilms(searchQuery, searchBy, this.props.sortBy);
  }

  /**
   * Handles search form submit
   * Performs search with form data
   * and changes location to the search page
   * 
   * @param {Object} inputs 
   * @memberof SearchFormComponent
   */
  handleSearch(inputs) {
    const searchQuery = inputs.searchQuery || '';
    const searchBy = this.props.searchBy;
    const searchParam = searchBy === 'movie' ? ''
      : `?searchBy=${searchBy}`;

    this.props.searchFilms(searchQuery, searchBy, this.props.sortBy);
    this.props.history.push(`/search/${searchQuery + searchParam}`);
  }

  /**
   * searchBy input change event handler
   * updates searchBy state with input value
   * 
   * @param {Object} event 
   * @memberof SearchFormComponent
   */
  handleSearchBy(event) {
    this.props.updateSearchBy(event.target.value);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSearch)} className="search-form">
        <h2 className="search-title">Find your movie</h2>
        <Field
          name="searchQuery"
          component="input"
          type="text"
          className="search-query"
          placeholder="Type there movie title or director"
        />
        <div className="clearfix">
          <div className="search-fields">
            <span>Search </span>
            <span>
              <input
                value="movie"
                id="ch-movie"
                type="radio"
                name="searchBy"
                onChange={this.handleSearchBy}
                checked={this.props.searchBy === 'movie'}
              />
              <label htmlFor="ch-movie"> movie </label>
            </span>
            <span>
              <input
                value="tv"
                id="ch-tv"
                type="radio"
                name="searchBy"
                onChange={this.handleSearchBy}
                checked={this.props.searchBy === 'tv'}
              />
              <label htmlFor="ch-tv"> tv </label>
            </span>
          </div>

          <button type="submit" className="btn btn-red search-button">search</button>
        </div>
      </form>
    );
  }
}
