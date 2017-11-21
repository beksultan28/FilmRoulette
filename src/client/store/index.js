/** @module store */

import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (process.env.NODE_ENV === 'development'
                          && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
                          || compose;

/**
 * A Redux store with promise middleware
 * @const store
 */
export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(promise),
  ),
);
/* eslint-enable */
