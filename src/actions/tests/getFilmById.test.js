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
const expectedResult = {
  id: 1,
  title: 'Test',
  name: 'Test',
  vote_average: 7.1,
  poster_path: '/mMohokylrZ2AsFPgqdrgI8o7i9i.jpg',
  overview: 'San Francisco, 1985.',
  release_date: '2013-06-29',
  first_air_date: '2013-06-29',
};
const expectedEmptyAction = [{
  type: 'RECIEVE_FILM_DETAIL',
  data: {},
}];

test('getFilmById returns empty result without fetching actual data if query is empty', () => {
  const store = mockStore({ detailItem: {} });

  store.dispatch(actions.getFilmById(undefined, 'movie'));
  expect(store.getActions()).toEqual(expectedEmptyAction);
});

test('getFilmById returns empty result if fetching request failed', () => {
  const store = mockStore({ detailItem: [] });

  // Mocking http requests
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet().reply(500);

  store.dispatch(actions.getFilmById(1, 'tv')).then(() => {
    expect(store.getActions()).toEqual(expectedEmptyAction);
  });
});

test('getFilmById returns detail item', () => {
  const store = mockStore({ detailItem: [] });

  const expectedAction = [{
    type: 'RECIEVE_FILM_DETAIL',
    data: expectedResult,
  }];

  // Mocking http requests
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet().reply(200, expectedResult);

  store.dispatch(actions.getFilmById(1, 'tv')).then(() => {
    expect(store.getActions()).toEqual(expectedAction);
  });
});
