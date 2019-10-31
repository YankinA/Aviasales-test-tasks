import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from './routes';

export const loadTicketsSuccess = createAction('LOAD_TICKETS_SUCCESS');
export const loadTicketsError = createAction('LOAD_TICKETS_ERROR');

export const loadTickets = () => async (dispatch) => {
  const getTickets = async () => {
    try {
      const respId = await axios.get(routes.getSearchId());
      const resp = await axios.get(routes.getTickets(respId.data.searchId));
      const { tickets } = resp.data;
      dispatch(loadTicketsSuccess({ tickets }));
    } catch (error) {
      dispatch(loadTicketsError());
      console.log(error);
      getTickets();
    }
  };
  getTickets();
};
