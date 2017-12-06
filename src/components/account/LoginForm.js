import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({account, errors, logging, onLogin, onChange}) => {
  return (
    <form>
      <h1>Login</h1>
      <p>
        If you don't have account, please &nbsp;
        <Link to="register">register</Link>
      </p>
      <TextInput
        name="username"
        label="User name"
        value={account.username}
        onChange={onChange}
        error={errors.username}/>

      <PasswordInput
        name="password"
        label="Password"
        value={account.password}
        onChange={onChange}
        error={errors.password}/>

      <input
        type="submit"
        disabled={logging}
        value={logging ? 'Logging....' : 'Login'}
        className="btn btn-primary"
        onClick={onLogin}/>
    </form>
  );
};

LoginForm.propTypes = {
  account: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  errors: PropTypes.object,
  logging: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default LoginForm;
