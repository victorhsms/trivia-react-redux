import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends Component {
  // Lógica para o botão 'Ver Ranking' após o término do jogo
  handleClickGoToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  // Lógica para o botão de voltar ao início na página de feedback
  handleClickBackHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score } = this.props;
    const MIN_SCORE = 3;
    const placar = Number(score);
    let message;

    if (placar < MIN_SCORE) {
      message = 'Could be better...';
    } else {
      message = 'Well Done!';
    }

    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{ message }</span>
        <Button
          textMessage="Ver Ranking"
          id="btn-ranking"
          disabled={ false }
          onClick={ this.handleClickGoToRanking }
        />
        <Button
          textMessage="Play Again"
          id="btn-play-again"
          disabled={ false }
          onClick={ this.handleClickBackHome }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
