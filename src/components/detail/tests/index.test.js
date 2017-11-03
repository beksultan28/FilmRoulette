import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import DetailComponent from '../index.jsx';

configure({ adapter: new Adapter() });

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
const newProps = {
  match: {
    params: {
      id: 2,
      searchBy: 'movie',
    },
  },
  detailItem: {
    id: 2,
  },
  getFilmById,
  updateSearchBy,
  getRecommendations,
};
const detailComponent = mount(
  <DetailComponent
    {...props}
  />,
);

test('DetailComponent renders the film title', () => {
  const title = detailComponent.find('.detail-title');
  expect(title.text()).toContain(props.detailItem.title);
});

test('DetailComponent renders poster', () => {
  const poster = detailComponent.find('.detail-img');
  expect(poster.prop('src')).toEqual(`http://image.tmdb.org/t/p/w342${props.detailItem.poster_path}`);
});

test('DetailComponent renders release_date', () => {
  const numbers = detailComponent.find('.detail-numbers');
  expect(numbers.html()).toContain(props.detailItem.release_date);
});

test('DetailComponent renders runtime', () => {
  const numbers = detailComponent.find('.detail-numbers');
  expect(numbers.html()).toContain(props.detailItem.runtime);
});

test('DetailComponent renders overview', () => {
  const overview = detailComponent.find('.detail-description');
  expect(overview.text()).toEqual(props.detailItem.overview);
});

test('DetailComponent renders link to the film page', () => {
  const link = detailComponent.find('.detail-extra a');
  expect(link.prop('href')).toEqual(props.detailItem.homepage);
});

test('getCategoryList() should return genres joined by ","', () => {
  let categoryList = detailComponent.instance().getCategoryList(props.detailItem.genres);
  expect(categoryList).toEqual('genre1, genre2');

  categoryList = detailComponent.instance().getCategoryList();
  expect(categoryList).toEqual('');
});

test('getRuntime() should return runtime string', () => {
  let runtimeString = detailComponent.instance().getRuntime(props.detailItem);
  expect(runtimeString).toContain(props.detailItem.runtime);

  const newItem = Object.assign({}, props.detailItem, { runtime: '' });
  runtimeString = detailComponent.instance().getRuntime(newItem);
  expect(runtimeString).toContain(newItem.number_of_episodes);
});

test('DetailComponent should call getFilmById callback on component mount', () => {
  const { id, searchBy } = props.match.params;
  expect(getFilmById).toBeCalledWith(id, searchBy);
  expect(getFilmById).toHaveBeenCalledTimes(1);
});

test('DetailComponent should call updateSearchBy callback on component mount', () => {
  const { searchBy } = props.match.params;
  expect(updateSearchBy).toBeCalledWith(searchBy);
  expect(updateSearchBy).toHaveBeenCalledTimes(1);
});

test('DetailComponent should call callback functions on getFilm() called', () => {
  const { id, searchBy } = props.match.params;

  detailComponent.instance().getFilm();

  expect(getFilmById).toBeCalledWith(id, searchBy);
  expect(getFilmById).toHaveBeenCalledTimes(2);

  expect(updateSearchBy).toBeCalledWith(searchBy);
  expect(updateSearchBy).toHaveBeenCalledTimes(2);
});

test('DetailComponent should call callback functions on component update', () => {
  const { id, searchBy } = newProps.match.params;

  detailComponent.setProps(newProps);

  expect(getRecommendations).toBeCalledWith(id, searchBy);
  expect(getRecommendations).toHaveBeenCalledTimes(1);

  expect(getFilmById).toBeCalledWith(id, searchBy);
  expect(getFilmById).toHaveBeenCalledTimes(3);

  expect(updateSearchBy).toBeCalledWith(searchBy);
  expect(updateSearchBy).toHaveBeenCalledTimes(3);
});
