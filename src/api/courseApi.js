import database from './database';

class CourseApi {

  static getAllCourses() {
    return database.ref('/courses/').once('value');

  }

}

export default CourseApi;
