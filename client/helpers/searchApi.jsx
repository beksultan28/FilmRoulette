import axios from 'axios';

/**
 * Api key for api.themoviedb.org
 * 
 * @const {String} apiKey
 */
const apiKey = '1d0f7ae4f812c5786d853bb50f47142d';

/**
 * Sends request to the server
 * to get film by id
 * 
 * @param {Integer} id
 * @param {String} searchBy
 * @returns {Object} promise
 */
export const getFilmApi = (id, searchBy) => {
  const requestUrl = `https://api.themoviedb.org/3/${searchBy}/${id}`
                      + `?api_key=${apiKey}&language=en-US`;
  return axios.get(requestUrl);
};

/**
 * Sends request to the server
 * to get recommendations for given id
 * 
 * @param {Integer} id
 * @param {String} searchBy
 * @returns {Object} promise
 */
export const getRecommendationsApi = (id, searchBy) => {
  const requestUrl = `https://api.themoviedb.org/3/${searchBy}/${id}/recommendations`
                      + `?api_key=${apiKey}&language=en-US&page=1`;
  return axios.get(requestUrl);
};

/**
 * Sends request to the server
 * to search for film with given criterias
 * 
 * @param {String} searchQuery
 * @param {String} searchBy
 * @returns {Object} promise
 */
export const searchApi = (searchQuery, searchBy) => {
  const requestUrl = `https://api.themoviedb.org/3/search/${searchBy}`
                      + `?api_key=${apiKey}&language=en-US&query=${searchQuery}`
                      + '&page=1&include_adult=false';
  return axios.get(requestUrl);
};
