import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SearchFormComponent from '../index.jsx';

configure({ adapter: new Adapter() });

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
const searchForm = shallow(
  <SearchFormComponent
    {...props}
  />,
);

test('SearchFormComponent should call callback functions on component mount', () => {
  expect(updateQuery).toBeCalledWith('');
  expect(updateQuery).toHaveBeenCalledTimes(1);

  expect(updateSearchBy).toBeCalledWith(props.searchBy);
  expect(updateSearchBy).toHaveBeenCalledTimes(1);

  expect(searchFilms).toBeCalledWith('', props.searchBy, props.sortBy);
  expect(searchFilms).toHaveBeenCalledTimes(1);
});

test('SearchFormComponent should call updateSearchBy callback on searchBy input changed', () => {
  const searchByInput = searchForm.find({
    name: 'searchBy',
    value: 'tv',
  });
  const event = {
    target: {
      value: 'tv',
    },
  };

  searchByInput.simulate('change', event);

  expect(updateSearchBy).toBeCalledWith('tv');
  expect(updateSearchBy).toHaveBeenCalledTimes(2);
});

test('SearchFormComponent should call handleSubmit callback on search form submit', () => {
  const form = searchForm.find('.search-form');

  form.simulate('submit');

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test('handleSearch() should call searchFilms callback', () => {
  const inputs = {
    searchQuery: 'Test query',
  };

  searchForm.instance().handleSearch(inputs);

  expect(searchFilms).toBeCalledWith(inputs.searchQuery, props.searchBy, props.sortBy);
  expect(searchFilms).toHaveBeenCalledTimes(2);
});

test('SearchFormComponent should call callback functions on component update', () => {
  // eslint-disable-next-line prefer-const
  let newProps = Object.assign({}, props, {
    searchQuery: 'Test query',
    match: {
      params: {
        query: 'Test query',
      },
    },
  });

  searchForm.setProps(newProps);

  expect(updateQuery).toBeCalledWith('');

  expect(updateSearchBy).toBeCalledWith(newProps.searchBy);

  expect(searchFilms).toBeCalledWith('', newProps.searchBy, newProps.sortBy);

  newProps.searchQuery = '';
  searchForm.setProps(newProps);
  expect(searchFilms).toBeCalledWith('', newProps.searchBy, newProps.sortBy);
});
