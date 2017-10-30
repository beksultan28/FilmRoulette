import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  RECIEVE_FILMS,
  RECIEVE_FILM_DETAIL,
  UPDATE_SORT_BY,
  UPDATE_SEARCH_BY,
} from '../actions/index';

/**
 * Reducer creator
 * 
 * @param {Array} type
 * @param {Any} defaultState
 * @returns {Function} Reducer
 */
const reducerCreator = (type, defaultState) => (state = defaultState, action) => {
  switch (action.type) {
    case type:
      return action.data;
    default:
      return state;
  }
};

/**
 * Reducer for receiving search results
 * 
 * @param {Array} state
 * @param {Object} action
 * @returns {Array} nextState
 */
const searchResults = reducerCreator(RECIEVE_FILMS, []);

/**
 * Reducer for receiving film details
 * 
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} nextState
 */
const detailItem = reducerCreator(RECIEVE_FILM_DETAIL, {});

/**
 * Reducer for updating sortBy
 * 
 * @param {string} state
 * @param {Object} action
 * @returns {string} nextState
 */
const sortBy = reducerCreator(UPDATE_SORT_BY, '');

/**
 * Reducer for receiving searchBy
 * 
 * @param {String} state
 * @param {Object} action
 * @returns {String} nextState
 */
const searchBy = reducerCreator(UPDATE_SEARCH_BY, 'movie');

/**
 * Combines all reducers and redux-form reducer
 */
export default combineReducers({
  searchResults,
  sortBy,
  searchBy,
  detailItem,
  form: formReducer,
});
