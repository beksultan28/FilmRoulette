import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SearchFormComponent from '../index.jsx';

const searchFilms = jest.fn();
const updateQuery = jest.fn();
const updateSearchBy = jest.fn();
const handleSubmit = jest.fn();
const props = {
  searchQuery: 'Test',
  searchBy: 'movie',
  sortBy: 'release_date',
  match: {
    params: {
      query: 'Test',
    },
  },
  history: [],
  searchFilms,
  updateQuery,
  updateSearchBy,
  handleSubmit,
};

const renderer = new ShallowRenderer();
renderer.render(
  <SearchFormComponent
    {...props}
  />,
);
const searchForm = renderer.getRenderOutput();

test('SearchFormComponent renders correctly', () => {
  expect(searchForm).toMatchSnapshot();
});
