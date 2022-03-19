import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenController, setNewPlayer, setScore } from '../actions/index';
import Input from '../components/Input';
import Button from '../components/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameValue: '',
      emailValue: '',
      btnStatus: true,
      redirectToGame: false,
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

  startGame = async () => {
    const { dispatch } = this.props;
    const { nameValue, emailValue } = this.state;
    dispatch(setNewPlayer(emailValue, nameValue));
    await dispatch(tokenController());
    this.setState({
      redirectToGame: true,
    });
    dispatch(setScore(0));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { nameValue, emailValue, btnStatus, redirectToGame } = this.state;
    return (
      <div>
        { redirectToGame
          ? <Redirect to="/game" />
          : (
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
                onClick={ this.startGame }
              />
              <Button
                textMessage="Configurações"
                id="btn-settings"
                disabled={ false }
                onClick={ this.handleClickSettings }
              />
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
