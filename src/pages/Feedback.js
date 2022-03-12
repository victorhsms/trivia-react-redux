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
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    let message;

    if (assertions < MIN_ASSERTIONS) {
      message = 'Could be better...';
    } else {
      message = 'Well Done!';
    }

    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ message }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
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
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
