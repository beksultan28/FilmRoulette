import reducer from '../index';

const initialState = {
  searchResults: [],
  sortBy: '',
  searchBy: 'movie',
  detailItem: {},
  form: {},
};

test('Reducer returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test('Reducer handles RECIEVE_FILMS', () => {
  const state = Object.assign({}, initialState, {
    searchResults: 'Test',
  });
  expect(reducer(initialState, {
    type: 'RECIEVE_FILMS',
    data: 'Test',
  })).toEqual(state);
});

test('Reducer handles RECIEVE_FILM_DETAIL', () => {
  const state = Object.assign({}, initialState, {
    detailItem: 'Test',
  });
  expect(reducer(initialState, {
    type: 'RECIEVE_FILM_DETAIL',
    data: 'Test',
  })).toEqual(state);
});

test('Reducer handles UPDATE_SORT_BY', () => {
  const state = Object.assign({}, initialState, {
    sortBy: 'Test',
  });
  expect(reducer(initialState, {
    type: 'UPDATE_SORT_BY',
    data: 'Test',
  })).toEqual(state);
});

test('Reducer handles UPDATE_SEARCH_BY', () => {
  const state = Object.assign({}, initialState, {
    searchBy: 'Test',
  });
  expect(reducer(initialState, {
    type: 'UPDATE_SEARCH_BY',
    data: 'Test',
  })).toEqual(state);
});
