import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Logicas extends Component {
  // Lógica para o botão 'Ver Ranking' após o término do jogo
  handleClickGoToFeedback = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  // Lógica para o botão de voltar ao início na página de feedback
  handleClickBackHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <h1>Ver Ranking</h1>
        <Button
          textMessage="Ver Ranking"
          id="btn-ranking"
          disabled={ false }
          onClick={ this.handleClickGoToFeedback }
        />
        <h1>Ir para o Início / Play Again</h1>
        <Button
          textMessage="Play Again"
          id="btn-go-home"
          disabled={ false }
          onClick={ this.handleClickBackHome }
        />
      </>
    );
  }
}

Logicas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Logicas;
