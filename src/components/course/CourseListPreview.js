import React, {PropTypes} from 'react';
import CourseListPriviewRow from './CourseListPriviewRow';

const CourseListPriview = ({courses}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {courses.map(course =>
        <CourseListPriviewRow key={course.id} course={course} />
      )}
      </tbody>
    </table>
  );
};

CourseListPriview.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseListPriview;
