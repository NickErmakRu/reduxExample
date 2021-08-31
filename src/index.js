import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import { forbiddenWordsMiddleware } from './redux/middleware';
import { rootReducer } from './redux/rootReducer';
import { sagaWatcher } from './redux/sagas';

import reportWebVitals from './reportWebVitals';

const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, forbiddenWordsMiddleware, saga  
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

saga.run(sagaWatcher);

const app = (
  <Provider store={ store }>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));

reportWebVitals();
