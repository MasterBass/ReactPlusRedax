import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import authentication from './authenticationReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  authentication
});

export default rootReducer;
