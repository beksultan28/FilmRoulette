import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ResultsItemComponent from '../index.jsx';

configure({ adapter: new Adapter() });

const props = {
  searchBy: 'movie',
  item: {
    id: 1,
    title: 'Test movie',
    vote_average: 5,
    release_date: '2017-01-01',
  },
};
const resultsItem = mount(
  <MemoryRouter>
    <ResultsItemComponent
      {...props}
    />
  </MemoryRouter>,
);

test('ResultsItemComponent renders item title', () => {
  const title = resultsItem.find('.result-title');
  expect(title.text()).toBe(props.item.title);
});

test('ResultsItemComponent renders poster', () => {
  const poster = resultsItem.find('.result-img img');
  expect(poster.prop('src')).toEqual(`http://image.tmdb.org/t/p/w342${props.item.poster_path}`);
});

test('ResultsItemComponent renders link to the detail page', () => {
  const link = resultsItem.find('a.result-content');
  expect(link.prop('href')).toEqual(`/film/${props.searchBy}/${props.item.id}`);
});
