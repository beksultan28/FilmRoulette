import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ResultsListComponent from '../index.jsx';

configure({ adapter: new Adapter() });

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
const resultsList = shallow(
  <ResultsListComponent
    {...props}
  />,
);
const emptyList = shallow(
  <ResultsListComponent/>,
);

test('ResultsListComponent should call callbacks', () => {
  resultsList.instance().onSort(props.sortBy);
  expect(updateSortBy).toBeCalledWith(props.sortBy);
  expect(updateSortBy).toHaveBeenCalledTimes(1);

  expect(sortFilms).toBeCalledWith(props.searchResults, props.sortBy);
  expect(sortFilms).toHaveBeenCalledTimes(1);
});

test('ResultsListComponent should render message if list is empty', () => {
  expect(emptyList.find('.no-result').text()).toBe('No films found');
});

test('getSortTitle() should return title string', () => {
  let title = resultsList.instance().getSortTitle();
  expect(title).toContain(props.searchResults.length);

  const newProps = Object.assign({}, props, { title: 'recommendation' });
  resultsList.setProps(newProps);
  title = resultsList.instance().getSortTitle();
  expect(title).toContain('Recommendations');
});
