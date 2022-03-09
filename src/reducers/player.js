import { EMAIL_USER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravaterEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_USER:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
