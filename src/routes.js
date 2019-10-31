const rootAPI = 'https://front-test.beta.aviasales.ru/';

export default {
  getSearchId: () => `${rootAPI}search`,
  getTickets: searchId => `${rootAPI}tickets?searchId=${searchId}`,
};
