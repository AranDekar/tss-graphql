/* eslint "no-console": off */

import 'babel-polyfill';
import makeServer from './server';


makeServer()
  .then((app) => {
    const port = process.env.PORT || 4000;
    app.listen(port);
    console.log(`🌎 Listening on port ${port}`);
  });
