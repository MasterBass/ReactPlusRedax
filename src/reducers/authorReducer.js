import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return Object.keys(action.authors).map((el) => {
        return {
          id: action.authors[el].id,
          firstName: action.authors[el].firstName,
          lastName: action.authors[el].lastName
        };
      });

    default:
      return state;
  }
}
