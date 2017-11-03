import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as actions from '../index';

const middlewares = [promise];
const mockStore = configureMockStore(middlewares);
/**
 * The name and first_air_date fields are dublicatates of title and release_date
 * API returns different fields for the movie and tv
 * So we dublicate them for simpler access
 */
const expectedResults = [{
  id: 1,
  title: 'Test',
  name: 'Test',
  vote_average: 7.1,
  poster_path: '/mMohokylrZ2AsFPgqdrgI8o7i9i.jpg',
  overview: 'San Francisco, 1985.',
  release_date: '2013-06-29',
  first_air_date: '2013-06-29',
}];
const expectedEmptyAction = [{
  type: 'RECIEVE_FILMS',
  data: [],
}];

test('getRecommendations returns empty result without fetching actual data if query is empty', () => {
  const store = mockStore({ searchResults: [] });

  store.dispatch(actions.getRecommendations('', 'movie'));
  expect(store.getActions()).toEqual(expectedEmptyAction);
});

test('getRecommendations returns empty result if fetching request failed', () => {
  const store = mockStore({ searchResults: [] });

  // Mocking http requests
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet().reply(500);

  store.dispatch(actions.getRecommendations('Test', 'tv')).then(() => {
    expect(store.getActions()).toEqual(expectedEmptyAction);
  });
});

test('getRecommendations returns recommendation list', () => {
  const store = mockStore({ searchResults: [] });

  const expectedAction = [{
    type: 'RECIEVE_FILMS',
    data: expectedResults,
  }];

  // Mocking http requests
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet().reply(200, {
    results: expectedResults,
  });

  store.dispatch(actions.getRecommendations(1, 'tv')).then(() => {
    expect(store.getActions()).toEqual(expectedAction);
  });
});
