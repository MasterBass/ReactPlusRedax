import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const RegisterForm = ({user, errors, registering, onChange, onRegister}) => {
  return (
    <form>
      <h1>Registration</h1>
      <TextInput
        name="username"
        label="User name"
        value={user.username}
        onChange={onChange}
        error={errors.username}/>

      <TextInput
        name="email"
        label="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}/>

      <PasswordInput
        name="password"
        label="Password"
        value={user.password}
        onChange={onChange}
        error={errors.password}/>

      <PasswordInput
        name="repeatPassword"
        label="Repeat Password"
        value={user.repeatPassword}
        onChange={onChange}
        error={errors.repeatPassword}/>

      <input
        type="submit"
        disabled={registering}
        value={registering ? 'Registering....' : 'Register'}
        className="btn btn-primary"
        onClick={onRegister}/>
    </form>
  );
};

RegisterForm.propTypes = {
  user: PropTypes.object.isRequired,
  onRegister: PropTypes.func.isRequired,
  errors: PropTypes.object,
  registering: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default RegisterForm;
