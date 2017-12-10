import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticationActions from '../../actions/authenticationActions';
import RegisterForm from "./RegisterForm";
import toastr from 'toastr';

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      registering: false,
      user: Object.assign({}, this.props.user)
    };
    this.register = this.register.bind(this);
    this.updateAccountState = this.updateAccountState.bind(this);
  }

  updateAccountState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  registerFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.user.username.length < 1) {
      errors.username = 'User name is obligatory';
      formIsValid = false;
    }
    if (this.state.user.email.length < 1) {
      errors.email = 'Email is obligatory';
      formIsValid = false;
    }
    let user = this.state.user;
    if (this.state.user.password.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
      formIsValid = false;
    } else if (this.state.user.repeatPassword != this.state.user.password) {
      errors.repeatPassword = 'Passwords are not equal';
      user.password = '';
      user.repeatPassword = '';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  register(event) {
    event.preventDefault();
    if (!this.registerFormIsValid()) {
      return;
    }

    this.setState({registering: true});
    let user = this.state.user;
    this.props.actions.register(this.state.user)
      .then(() => {
        toastr.success('User registered');
        this.setState({registering: false, user: user});
        this.context.router.push('/login');
      })
      .catch(error => {
        if(error) {
          toastr.error(error);
        } else {
          toastr.error(error);
        }
        this.setState({registering: false});
      });
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        onRegister={this.register}
        registering={this.state.registering}
        errors={this.state.errors}
        onChange={this.updateAccountState}
      />
    );
  }
}

RegisterPage.contextTypes = {
  router: PropTypes.object
};

RegisterPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let user = {username: '', email: '', password: '', repeatPassword: ''};
  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
