import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../redux/actions';

import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      activeButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyButton());
  }

  verifyButton = () => {
    const { password, email } = this.state;
    const minPassword = 5;
    const validEmail = /\S+@\S+\.\S+/;
    if (password.length >= minPassword && validEmail.test(email)) {
      this.setState({ activeButton: false });
    } else {
      this.setState({ activeButton: true });
    }
  };

  render() {
    const { addEmailDispatch } = this.props;
    const { email, password, activeButton } = this.state;
    return (
      <section className="login">
        <div className="inputsLogin">
          <h1>Login</h1>
          <input
            type="email"
            className="inputs"
            value={ email }
            name="email"
            placeholder="Digite seu e-mail"
            data-testid="email-input"
            required
            onChange={ this.handleChange }
          />
          <input
            type="password"
            className="inputs"
            name="password"
            value={ password }
            placeholder="Digite sua senha"
            data-testid="password-input"
            min="6"
            required
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              className="buttonLogin"
              type="button"
              onClick={ () => addEmailDispatch(email) }
              disabled={ activeButton }
            >
              Entrar

            </button>
          </Link>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  addEmailDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addEmailDispatch: (payload) => dispatch(addEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
