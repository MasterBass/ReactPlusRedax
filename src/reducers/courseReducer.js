import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return Object.keys(action.courses).map((el) => {
        return {
          id: action.courses[el].id,
          title: action.courses[el].title,
          watchHref: action.courses[el].watchHref,
          authorId: action.courses[el].authorId,
          length: action.courses[el].length,
          category: action.courses[el].category
        };
      });

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
