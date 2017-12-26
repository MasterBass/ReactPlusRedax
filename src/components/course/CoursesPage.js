import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import * as authorActions from '../../actions/authorActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import * as modalActions from '../../actions/modalActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }


  componentWillMount() {
    this.props.actions.loadCourses();
    this.props.authorActions.loadAuthors();
  }

  deleteCourse(event) {
    event.preventDefault();
    this.props.modalActions.showModal({
      modalType: 'DELETE_COURSE',
      modalProps: {
        courseId: event.target.id
      }
    });
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses} deleteCourse={this.deleteCourse}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired
};



function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
