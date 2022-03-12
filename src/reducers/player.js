import { NEW_PLAYER, SET_SCORE, ADD_ASSERTION } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case ADD_ASSERTION:
    return {
      ...state,
      assertions: action.assertion,
    };
  default:
    return state;
  }
};

export default playerReducer;
