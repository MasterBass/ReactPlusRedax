import * as types from './actionTypes';
import courseApi from '../api/courseApi';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusAction";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCoursesSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCoursesSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCoursesSuccess(courseId) {
  return { type: types.DELETE_COURSE_SUCCESS, courseId };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses.val()));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(courses => {
      course.id ? dispatch(updateCoursesSuccess(course)) :
      dispatch(createCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteCourse(courseId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(courseId).then(() => {
      dispatch(deleteCoursesSuccess(courseId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
