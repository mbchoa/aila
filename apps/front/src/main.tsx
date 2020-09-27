import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'jotai';

import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
