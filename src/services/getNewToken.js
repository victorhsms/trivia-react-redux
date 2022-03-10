const getNewToken = async () => {
  const URL_REQUEST = 'https://opentdb.com/api_token.php?command=request';
  const requestApi = await fetch(URL_REQUEST);
  const result = await requestApi.json();
  const { token } = result;
  return token;
};

export default getNewToken;
