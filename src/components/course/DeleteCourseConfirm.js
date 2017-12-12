import * as modalActions from '../../actions/modalActions';
import * as courseActions from '../../actions/courseActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {PropTypes} from 'react';
import toastr from 'toastr';

export class DeleteCourseConfirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      deleting: false
    };
    this.hideModal = this.hideModal.bind(this);
    this.deleteCourse= this.deleteCourse.bind(this);
  }

  hideModal() {
    this.props.modalActions.hideModal();
  }

  deleteCourse() {
    this.setState({deleting: true});
    this.props.courseActions.deleteCourse(this.props.courseId).then(() => {
      this.props.courseActions.loadCourses();
    }).then(() => {
      this.setState({deleting: false});
      this.props.modalActions.hideModal();
    }).catch(error => {
      this.setState({deleting: false});
      toastr.error(error);
    });
  }

  render() {
    return (
      <div>
        <div className="modal fade in" id="modal-dialog" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" onClick={this.hideModal} className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title"></h4>
              </div>
              <div className="modal-body">
                <p>Would you like to delete course: {this.props.courseId}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={this.state.deleting}
                        onClick={this.deleteCourse} className="btn btn-danger" data-dismiss="modal">{this.state.deleting ? 'Deleting....' : 'Delete'}
                </button>
                <button type="button" onClick={this.hideModal} className="btn btn-default" data-dismiss="modal">Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in"></div>
      </div>
    );
  }
}

DeleteCourseConfirm.propTypes = {
  modalActions: PropTypes.object.isRequired,
  courseActions: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courseId: ownProps.courseId,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    courseActions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCourseConfirm);
