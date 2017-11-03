/** @module containers */

import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line no-unused-vars
import * as styles from '../style.css';

import SearchContainer from './search.jsx';
import DetailContainer from './detail.jsx';

/**
 * Root container component
 * 
 * @export
 * @class RootContainer
 * @extends {Component}
 */
class RootContainer extends Component {
  componentDidUpdate(prevProps) {
    // Scroll to top when location has changed
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={SearchContainer} />
        <Route path="/search/:query?" component={SearchContainer} />
        <Route path="/film/:searchBy/:id" component={DetailContainer} />
      </div>
    );
  }
}

export default withRouter(RootContainer);
