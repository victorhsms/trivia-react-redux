import getNewToken from '../services/getNewToken';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_TOKEN = 'NEW_TOKEN';

export const setNewPlayer = (emailPlayer, namePlayer) => ({
  type: NEW_PLAYER,
  email: emailPlayer,
  name: namePlayer,
});

export const setNewToken = (token) => ({
  type: NEW_TOKEN,
  token,
});

export const tokenController = () => async (dispatch) => {
  const newToken = await getNewToken();
  localStorage.setItem('token', newToken);

  dispatch(setNewToken(newToken));
};
