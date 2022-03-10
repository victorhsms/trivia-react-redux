import { NEW_TOKEN } from '../actions/index';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default tokenReducer;
