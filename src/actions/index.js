import getNewToken from '../services/getNewToken';

export const EMAIL_USER = 'EMAIL_USER';
export const NEW_TOKEN = 'NEW_TOKEN';

export const setEmail = (emailUser) => ({
  type: EMAIL_USER,
  email: emailUser,
});

export const setNewToken = (token) => ({
  type: NEW_TOKEN,
  token,
});

export const tokenController = () => async (dispatch) => {
  let newToken = localStorage.getItem('token');
  if (newToken === null) {
    newToken = await getNewToken();
    localStorage.setItem('token', newToken);
  }

  dispatch(setNewToken(newToken));
};
