import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// applyMiddleware(thunk)

const store = createStore(rootReducer);

if (window.Cypress) {
  window.store = store;
}

export default store;
