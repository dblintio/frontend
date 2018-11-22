import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadComponents } from 'loadable-components';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import App from './App';
import reducer from './reducers';
import { routes } from './constants';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

const data = window.__INITIAL_DATA__;

loadComponents().then(() => {
  ReactDOM.hydrate(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App routes={routes} initialData={data} />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
