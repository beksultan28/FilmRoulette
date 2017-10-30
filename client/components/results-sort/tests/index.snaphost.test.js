import React from 'react';
import renderer from 'react-test-renderer';

import ResultsSortComponent from '../index.jsx';

const onSort = jest.fn();
const props = {
  title: 'Test title',
  sortBy: 'release_date',
  onSort,
};
const resultSort = renderer.create(
  <ResultsSortComponent
    {...props}
  />,
);

test('ResultsSortComponent renders correctly', () => {
  expect(resultSort.toJSON()).toMatchSnapshot();
});
