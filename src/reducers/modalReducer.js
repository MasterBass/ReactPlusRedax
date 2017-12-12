import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function modalReducer(state = initialState.modal, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return Object.assign({}, state, {
        modalType: action.props.modalType,
        modalProps: action.props.modalProps
      });
    case types.HIDE_MODAL:
      return Object.assign({}, state, {
        modalType: null,
        modalProps: {}
      });

    default:
      return state;
  }
}
