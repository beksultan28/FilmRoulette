import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ResultsSortComponent from '../index.jsx';

configure({ adapter: new Adapter() });

const onSort = jest.fn();
const props = {
  title: 'Test title',
  sortBy: 'release_date',
  onSort,
};
const resultSort = mount(
  <ResultsSortComponent
    {...props}
  />,
);

test('ResultsSortComponent renders the title text', () => {
  const title = resultSort.find('.results-sort-title');
  expect(title.text()).toBe(props.title);
});

test('ResultsSortComponent should call callback when sort by link is clicked', () => {
  const link = resultSort.find({ 'data-value': 'vote_average' });
  link.simulate('click');
  expect(onSort).toBeCalledWith('vote_average');
});
