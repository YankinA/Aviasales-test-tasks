import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const tickets = handleActions({
  [actions.loadTicketsSuccess](state, { payload }) {
    return payload.tickets;
  },
}, 'none');

export default combineReducers({ tickets });
