import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';
import csshook from 'css-modules-require-hook/preset'; // eslint-disable-line

import store from '../client/store';
import RootContainer from '../client/containers/root.jsx';


export default (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <RootContainer/>
      </StaticRouter>
    </Provider>,
  );

  fs.readFile(('./build/index.html'), 'utf8', (err, data) => {
    if (err) throw err;

    const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);

    res.send(document);
  });
};
