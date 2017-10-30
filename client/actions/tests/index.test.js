import * as actions from '../index';

test('updateSortBy returns sortBy', () => {
  const sortBy = 'Test';
  const expected = {
    type: 'UPDATE_SORT_BY',
    data: sortBy,
  };
  expect(actions.updateSortBy(sortBy)).toEqual(expected);
});

test('updateSearchBy returns searchBy', () => {
  const searchBy = 'Test';
  const expected = {
    type: 'UPDATE_SEARCH_BY',
    data: searchBy,
  };
  expect(actions.updateSearchBy(searchBy)).toEqual(expected);
});

test('sortFilms returns sorted films', () => {
  let sortBy = '';
  const type = 'RECIEVE_FILMS';
  const emptyData = [];
  const data = [
    {
      rate: 5,
      release_date: '2000-12-12',
    },
    {
      rate: 10,
      release_date: '2017-12-12',
    },
    {
      rate: 1,
      release_date: '1999-12-12',
    },
  ];
  const sortedData = [
    {
      rate: 10,
      release_date: '2017-12-12',
    },
    {
      rate: 5,
      release_date: '2000-12-12',
    },
    {
      rate: 1,
      release_date: '1999-12-12',
    },
  ];

  expect(actions.sortFilms(undefined, sortBy)).toEqual({
    type,
    data: emptyData,
  });

  sortBy = 'release_date';
  expect(actions.sortFilms(data, sortBy)).toEqual({
    type,
    data: sortedData,
  });

  sortBy = 'rate';
  expect(actions.sortFilms(data, sortBy)).toEqual({
    type,
    data,
  });
});

test('updateQuery returns redux-form action', () => {
  const query = 'Test';
  const expected = {
    meta: {
      field: 'searchQuery',
      form: 'search',
    },
    payload: 'Test',
  };
  expect(actions.updateQuery(query)).toMatchObject(expected);
});
