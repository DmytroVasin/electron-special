import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import calculator from './reducers/calculator';
import user from './reducers/user';
import settings from './reducers/settings';
import updater from './reducers/updater';
import userActions from './actions/user';

export default function configureStore(initialState) {
  const actionCreators = {
    ...userActions
  };

  const reducers = {
    calculator,
    user,
    settings,
    updater
  };

  const middlewares = [ thunk ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }

    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
