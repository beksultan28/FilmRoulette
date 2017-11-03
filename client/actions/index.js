/** @module actions */

import { change } from 'redux-form';
import { searchApi, getFilmApi, getRecommendationsApi } from '../helpers/searchApi.jsx';

/** 
 * @constant 
 * @type {String}
 */
export const RECIEVE_FILMS = 'RECIEVE_FILMS';

/** 
 * @constant 
 * @type {String}
 */
export const RECIEVE_FILM_DETAIL = 'RECIEVE_FILM_DETAIL';

/** 
 * @constant 
 * @type {String}
 */
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';

/** 
 * @constant 
 * @type {String}
 */
export const UPDATE_SEARCH_BY = 'UPDATE_SEARCH_BY';

/**
 * Action creator
 * 
 * @param {Array} type
 * @returns {Function} Action
 */
const actionCreator = type => data => ({
  type,
  data,
});

/**
 * Returns recieve films action
 * for internal use, not exported
 * 
 * @param {Array} data
 * @returns {Object} action
 */
const recieveFilms = actionCreator(RECIEVE_FILMS);

/**
 * Returns recieve film detail action
 * for internal use, not exported
 * 
 * @param {Object} data
 * @returns {Object} action
 */
const recieveFilmById = actionCreator(RECIEVE_FILM_DETAIL);

/**
 * Returns update sort by action
 * 
 * @param {String} data
 * @returns {Object} action
 */
export const updateSortBy = actionCreator(UPDATE_SORT_BY);

/**
 * Returns update search by action
 * 
 * @param {String} data
 * @returns {Object} action
 */
export const updateSearchBy = actionCreator(UPDATE_SEARCH_BY);

/**
 * Updates search query
 * Calls redux-form api
 * 
 * @param {String} query
 */
export const updateQuery = query => (
  change('search', 'searchQuery', query)
);

/**
 * TV Shows don`t have title and release_date fields
 * So we dublicate name and first_air_date fields instead
 * This is for further simpler usage
 * 
 * @param {Array} data
 * @returns {Array}
 */
const dublicateKeysForTV = data => (
  data.map((item) => {
    // eslint-disable-next-line prefer-const
    let film = item;
    film.title = item.name;
    film.release_date = item.first_air_date;
    return film;
  })
);

/**
 * Sorts given data by given criteria
 * and returns recieveFilms call result
 * 
 * @param {Array} data
 * @param {String|Undefined} sortBy
 * @returns {Object} action
 */
export const sortFilms = (data = [], sortBy) => {
  if (!data.length || !sortBy) {
    return recieveFilms(data);
  }
  const sortedData = data.sort((a, b) => {
    if (sortBy === 'release_date') {
      if (b[sortBy] < a[sortBy]) {
        return -1;
      }
      return 1;
    }
    return b[sortBy] - a[sortBy];
  });
  return recieveFilms(sortedData);
};

/**
 * Searches films by given criterias
 * 
 * @param {String} searchQuery
 * @param {String} searchBy
 * @param {String|Undefined} sortBy
 * @returns {Object} action
 */
export const searchFilms = (searchQuery, searchBy, sortBy) => {
  if (!searchQuery) {
    return recieveFilms([]);
  }
  return searchApi(searchQuery, searchBy)
    .then((response) => {
      let data = response.data.results;

      /**
       * Result structure is different for movie and tv
       * Adding some new keys
       */
      if (searchBy === 'tv') {
        data = dublicateKeysForTV(data);
      }
      return sortFilms(data, sortBy);
    })
    .catch(() => recieveFilms([]));
};

/**
 * Searches for recommendations 
 * with given id
 * 
 * @param {Integer} id
 * @param {String} searchBy
 * @returns {Object} action
 */
export const getRecommendations = (id, searchBy) => {
  if (!id) {
    return recieveFilms([]);
  }
  return getRecommendationsApi(id, searchBy)
    .then((response) => {
      let data = response.data.results;

      /**
       * Result structure is different for movie and tv
       * Adding some new keys
       */
      if (searchBy === 'tv') {
        data = dublicateKeysForTV(data);
      }
      return sortFilms(data);
    })
    .catch(() => recieveFilms([]));
};

/**
 * Searches for film
 * with given id
 * 
 * @param {Integer} id
 * @param {String} searchBy
 * @returns {Object} action
 */
export const getFilmById = (id, searchBy) => {
  if (!id) {
    return recieveFilmById({});
  }

  return getFilmApi(id, searchBy)
    .then((response) => {
      // eslint-disable-next-line prefer-const
      let data = response.data;

      /**
       * Result structure is different for movie and tv
       * Adding some new keys
       */
      if (searchBy === 'tv') {
        data.title = data.name;
        data.release_date = data.first_air_date;
      }
      return recieveFilmById(data);
    })
    .catch(() => recieveFilmById({}));
};
