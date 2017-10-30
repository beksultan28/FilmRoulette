import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(promise),
  ),
);
/* eslint-enable */
