import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import initEventBus from './renderer/eventBus'

import InitContainer from './containers/InitContainer'

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <InitContainer />
  </Provider>,
  document.getElementById('root')
);

initEventBus(store)
