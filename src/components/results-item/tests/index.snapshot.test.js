import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ResultsItemComponent from '../index.jsx';

const props = {
  searchBy: 'movie',
  item: {
    id: 1,
    title: 'Test movie',
    vote_average: 5,
    release_date: '2017-01-01',
  },
};
const resultsItem = renderer.create(
  <MemoryRouter>
    <ResultsItemComponent
      {...props}
    />
  </MemoryRouter>,
);

test('ResultsItemComponent renders correctl', () => {
  expect(resultsItem.toJSON()).toMatchSnapshot();
});

