import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DetailContainer from '../detail.jsx';
import SearchContainer from '../search.jsx';

const renderer = new ShallowRenderer();

renderer.render(
  <DetailContainer/>,
);
const detailContainer = renderer.getRenderOutput();

renderer.render(
  <SearchContainer/>,
);
const searchContainer = renderer.getRenderOutput();

test('DetailContainer renders correctly', () => {
  expect(detailContainer).toMatchSnapshot();
});

test('SearchContainer renders correctly', () => {
  expect(searchContainer).toMatchSnapshot();
});
