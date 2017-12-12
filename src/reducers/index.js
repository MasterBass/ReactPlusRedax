import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authentication from './authenticationReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  authentication,
  modal
});

export default rootReducer;
