import React, { Component } from 'react';

// eslint-disable-next-line no-unused-vars
import * as styles from './style.css';

/**
 * Component for sorting search results
 * 
 * @export
 * @class ResultsSortComponent
 * @extends {Component}
 */
export default class ResultsSortComponent extends Component {
  constructor(props) {
    super(props);

    this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  /**
   * onShort change event handler
   * Stops event bubble and calls onSort
   * property function with event data
   * 
   * @param {Object} event 
   * @memberof ResultsSortComponent
   */
  handleSortByChange(event) {
    event.preventDefault();
    this.props.onSort(event.target.getAttribute('data-value'));
  }

  render() {
    return (
      <div className="results-sort">
        <div className="container wrapper">
          <div className="row">
            <div className="col-xs-6 results-sort-title">
              { this.props.title }
            </div>
            {this.props.onSort ? (
              <div className="col-xs-6 text-right">
                Sort by
                <a href="#!"
                  onClick={this.handleSortByChange}
                  data-value="release_date"
                  className={(this.props.sortBy === 'release_date') ? 'active' : ''}>release date</a>
                <a href="#!"
                  onClick={this.handleSortByChange}
                  data-value="vote_average"
                  className={(this.props.sortBy === 'vote_average') ? 'active' : ''}>rating</a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
