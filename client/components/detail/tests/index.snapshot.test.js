import React from 'react';
import renderer from 'react-test-renderer';

import DetailComponent from '../index.jsx';

const getFilmById = jest.fn();
const updateSearchBy = jest.fn();
const getRecommendations = jest.fn();
const props = {
  match: {
    params: {
      id: 1,
      searchBy: 'movie',
    },
  },
  detailItem: {
    id: 1,
    title: 'Test movie',
    vote_average: 5,
    release_date: '2017-01-01',
    poster_path: 'poster.jpg',
    genres: [
      {
        name: 'genre1',
      },
      {
        name: 'genre2',
      },
    ],
    overview: 'Overview text',
    homepage: 'site.com',
    runtime: 100,
    number_of_episodes: 100,
  },
  getFilmById,
  updateSearchBy,
  getRecommendations,
};
const detailComponent = renderer.create(
  <DetailComponent
    {...props}
  />,
);

test('DetailComponent renders correctly', () => {
  expect(detailComponent.toJSON()).toMatchSnapshot();
});
