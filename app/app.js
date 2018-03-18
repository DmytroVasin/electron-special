import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import Router from './routes';
import configureStore from './store';

// const syncHistoryWithStore = (store, history) => {
//   const { routing } = store.getState();
//   if(routing && routing.location) {
//     history.replace(routing.location);
//   }
// };

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);

// syncHistoryWithStore(store, routerHistory);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <Router />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
