import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameValue: '',
      emailValue: '',
      btnStatus: true,
    };
  }

  componentDidUpdate() {
    this.btnController();
  }

  btnController = () => {
    const { nameValue, emailValue, btnStatus } = this.state;
    const conditions = nameValue.length > 0 && emailValue.length > 0;
    if (conditions && btnStatus) {
      this.setState({
        btnStatus: false,
      });
    } else if (!conditions && !btnStatus) {
      this.setState({
        btnStatus: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { nameValue, emailValue, btnStatus } = this.state;
    return (
      <div>
        <Input
          textMessage="Informe seu nome: "
          id="input-player-name"
          type="text"
          name="nameValue"
          placeholder="Ex: Edmur Neves"
          value={ nameValue }
          onChange={ this.handleChange }
        />
        <Input
          textMessage="Informe seu email: "
          id="input-gravatar-email"
          type="email"
          name="emailValue"
          placeholder="Ex: email@email.com"
          value={ emailValue }
          onChange={ this.handleChange }
        />
        <Button
          textMessage="Play"
          id="btn-play"
          disabled={ btnStatus }
          onClick={ () => {} }
        />
      </div>
    );
  }
}

Login.propTypes = {

};

export default Login;
