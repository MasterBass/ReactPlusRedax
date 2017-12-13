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
    const customStyles = {
      content : {
        top                   : '25%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width                 : '500px',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal">

        <h4>Delete course</h4>
        <p>{this.props.courseId}</p>
        <button className="btn btn-danger" onClick={this.deleteCourse}
                disabled={this.state.deleting}>{this.state.deleting ? 'Deleting....' : 'Delete'}</button>
        <button className="btn btn-secondary" onClick={this.closeModal}
                disabled={this.state.deleting}>Cancel</button>
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
