const getQuestions = async (token) => {
  const URL_REQUEST = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const requestApi = await fetch(URL_REQUEST);
  const result = await requestApi.json();
  const { results } = result;
  return results;
};

export default getQuestions;
