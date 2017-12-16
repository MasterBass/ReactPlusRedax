import database from './database';

class CourseApi {

  static getAllCourses() {
    return database.ref('/courses/').once('value');
  }

  static saveCourse(course) {
    if (course.id) {
      return database.ref('/courses/' + course.id).update(course);
    } else {
      course.id = generateId(course);
      course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;

      return database.ref('/courses/' + course.id).update(course);
    }
  }

  static deleteCourse(courseId) {
    return database.ref('/courses/' + courseId).remove();
  }



}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

export default CourseApi;
