import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticationActions from '../../actions/authenticationActions';
import LoginForm from "./LoginForm";
import toastr from 'toastr';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      logging: false,
      account: Object.assign({}, this.props.account)
    };
    this.login = this.login.bind(this);
    this.updateAccountState = this.updateAccountState.bind(this);
  }

  updateAccountState(event) {
    const field = event.target.name;
    let account = this.state.account;
    account[field] = event.target.value;
    return this.setState({account: account});
  }

  loginFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.account.email.length < 1) {
      errors.email = 'User email is obligatory';
      formIsValid = false;
    }
    if (this.state.account.password.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  login(event) {
    event.preventDefault();
    if (!this.loginFormIsValid()) {
      return;
    }

    this.setState({logging: true});
    let account = this.state.account;
    this.props.actions.authenticate(this.state.account)
      .then(() => {
        if (this.props.isLoggedIn) {
          this.redirect();
        } else {
          account.password = '';
          toastr.error('User does not exist or password is not correct');
          this.setState({logging: false, account: account});
        }
      })
      .catch(error => {
        toastr.error(error);
        this.setState({logging: false});
      });
  }


  redirect() {
    this.setState({logging: false});
    toastr.success('Success login');
    this.context.router.push(this.props.redirectUrl);
  }

  render() {
    return (
      <LoginForm
        account={this.state.account}
        onLogin={this.login}
        logging={this.state.logging}
        errors={this.state.errors}
        onChange={this.updateAccountState}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object
};

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string,
  isLoggedIn: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  let account = {email: '', password: ''};
  return {
    account: account,
    redirectUrl: state.authentication.redirectUrl,
    isLoggedIn: state.authentication.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
