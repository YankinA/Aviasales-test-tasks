import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  compose,
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from '../reducers';
import * as actions from '../actions';

export default () => {
  const initialState = {
    tickets: [],
  };

  /* eslint-disable no-underscore-dangle */
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    reducers,
    initialState,
    reduxDevtools(
      applyMiddleware(thunk),
    ),
  );

  store.dispatch(actions.loadTickets());

  render(
    <Provider store={store}>
      <App />
    </Provider>, document.querySelector('#aviasales-page'),
  );
};
