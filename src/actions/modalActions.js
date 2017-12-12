import * as types from './actionTypes';

export function showModal(props) {
  return {
    type: types.SHOW_MODAL,
    props
  };
}

export function hideModal() {
  return {
    type: types.HIDE_MODAL
  };
}
