import getNewToken from '../services/getNewToken';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_TOKEN = 'NEW_TOKEN';
export const SET_SCORE = 'NEW_SCORE';
export const ADD_ASSERTION = 'ADD_ASSERTION';

export const setNewPlayer = (emailPlayer, namePlayer) => ({
  type: NEW_PLAYER,
  email: emailPlayer,
  name: namePlayer,
});

export const setNewToken = (token) => ({
  type: NEW_TOKEN,
  token,
});

export const setScore = (newScore) => ({
  type: SET_SCORE,
  score: newScore,
});

export const addAssertions = (assertion) => ({
  type: ADD_ASSERTION,
  assertion,
});

export const tokenController = () => async (dispatch) => {
  const newToken = await getNewToken();
  localStorage.setItem('token', newToken);

  dispatch(setNewToken(newToken));
};

export const scoreController = (oldScore,
  difficulty,
  currentSecond) => (dispatch) => {
  const MAX_DIFFICULTY = 3;
  const BASE_POINT = 10;
  let variablePoints;

  switch (difficulty) {
  case 'hard':
    variablePoints = currentSecond * MAX_DIFFICULTY;
    break;
  case 'medium':
    variablePoints = currentSecond * 2;
    break;
  default:
    variablePoints = currentSecond * 1;
    break;
  }

  const total = BASE_POINT + variablePoints;
  const newScore = oldScore + total;

  dispatch(setScore(newScore));
};
