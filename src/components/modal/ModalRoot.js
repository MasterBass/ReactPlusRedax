import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import {ModalTypes} from './ModalTypes';
import {bindActionCreators} from 'redux';

export class ModalRoot extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (!this.props.modalType) {
      return null;
    }
    const SpecificModal = ModalTypes[this.props.modalType];
    return (
      <SpecificModal {...this.props.modalProps} />
    );
  }
}

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object
};

function mapStateToProps(state) {
  return {
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(modalActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
