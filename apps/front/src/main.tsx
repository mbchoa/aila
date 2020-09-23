import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'jotai';

import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
