import { NEW_PLAYER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravaterEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default playerReducer;