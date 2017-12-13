import * as modalActions from '../../actions/modalActions';
import * as courseActions from '../../actions/courseActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {PropTypes} from 'react';
import toastr from 'toastr';
import Modal from 'react-modal';

export class DeleteCourseConfirm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      deleting: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.deleteCourse= this.deleteCourse.bind(this);
  }

  closeModal() {
    this.props.modalActions.hideModal();
  }

  deleteCourse() {
    this.setState({deleting: true});
    this.props.courseActions.deleteCourse(this.props.courseId).then(() => {
      this.props.courseActions.loadCourses();
    }).then(() => {
      this.setState({deleting: false});
      this.props.modalActions.hideModal();
      toastr.success('course deleted');
    }).catch(error => {
      this.setState({deleting: false});
      toastr.error(error);
    });
  }

  render() {
    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal}
        ariaHideApp={false} >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.closeModal}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Delete course</h4>
          </div>
          <div className="modal-body">
            <p>{this.props.courseId}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.closeModal}
                    disabled={this.state.deleting}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.deleteCourse}
                    disabled={this.state.deleting}>{this.state.deleting ? 'Deleting....' : 'Delete'}</button>
          </div>
        </div>
      </Modal>
    );
  }
}

DeleteCourseConfirm.propTypes = {
  modalActions: PropTypes.object.isRequired,
  courseActions: PropTypes.object.isRequired,
  courseId: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    courseId: ownProps.courseId,
    courses: state.courses,
    modalIsOpen: !(state.modal.modalType === null)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    courseActions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCourseConfirm);
