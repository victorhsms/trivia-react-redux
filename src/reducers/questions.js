import { ALL_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};

const setQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ALL_QUESTIONS:
    return action.questions;
  default:
    return state;
  }
};

export default setQuestions;
