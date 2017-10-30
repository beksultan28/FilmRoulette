import React, { Component } from 'react';

import ResultsItemComponent from '../results-item/index.jsx';
import ResultsSortComponent from '../results-sort/index.jsx';

// eslint-disable-next-line no-unused-vars
import * as styles from './style.css';

/**
 * Search results component
 * Displays search results and ResultsSortComponent
 * 
 * @export
 * @class ResultsListComponent
 * @extends {Component}
 */
export default class ResultsListComponent extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);
  }

  /**
   * Generates title for ResultsSortComponent
   * 
   * @returns {String} title
   * @memberof ResultsListComponent
   */
  getSortTitle() {
    if (this.props.title === 'count') {
      return `${this.props.searchResults.length} items found`;
    }
    return 'Recommendations';
  }

  /**
   * onSort event handler
   * Updates sortBy state with given data
   * Calls updateSortBy property function
   * Passed down to ResultsSortComponent child
   * 
   * @param {String} sortBy 
   * @memberof ResultsListComponent
   */
  onSort(sortBy) {
    this.props.updateSortBy(sortBy);
    this.props.sortFilms(this.props.searchResults, sortBy);
  }

  render() {
    return this.props.searchResults && this.props.searchResults.length ? (
      <div>
        <ResultsSortComponent
          onSort={this.onSort}
          sortBy={this.props.sortBy}
          title={this.getSortTitle()} />
        <div className="container">
          <div className="results-list">
            <div className="row">
              {this.props.searchResults.map(el =>
                <div key={el.id} className="col-xs-4">
                  <ResultsItemComponent
                    item={el}
                    searchBy={this.props.searchBy}
                  />
                </div>,
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="no-result">
          No films found
      </div>
    );
  }
}
