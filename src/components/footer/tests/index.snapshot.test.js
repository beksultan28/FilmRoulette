import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import FooterComponent from '../index.jsx';

test('FooterComponent renders correctly', () => {
  const footer = renderer.create(
    <MemoryRouter>
      <FooterComponent/>
    </MemoryRouter>,
  );
  expect(footer.toJSON()).toMatchSnapshot();
});
