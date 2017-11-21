import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ResultsListComponent from '../index.jsx';

const updateSortBy = jest.fn();
const sortFilms = jest.fn();
const props = {
  title: 'count',
  searchResults: [{
    id: 1,
    title: 'Test movie',
    vote_average: 5,
    release_date: '2017-01-01',
  }],
  sortBy: 'movie',
  updateSortBy,
  sortFilms,
};

const renderer = new ShallowRenderer();
renderer.render(
  <ResultsListComponent
    {...props}
  />,
);
const resultsList = renderer.getRenderOutput();

test('ResultsListComponent renders correctly', () => {
  expect(resultsList).toMatchSnapshot();
});
