import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { scoreController } from '../actions/index';
import Button from './Button';

class Question extends Component {
  onClickCorrectAnswer = () => {
    const {
      showBtnNext,
      dispatch,
      score,
      name,
      difficulty,
      currentSecond,
    } = this.props;
    showBtnNext();

    dispatch(scoreController(score, difficulty, currentSecond, name));

    console.log('correto');
  }

  onClickIncorrectAnswer = () => {
    const { showBtnNext } = this.props;
    showBtnNext();

    console.log('falso');
  }

  render() {
    const {
      category,
      question,
      type,
      difficulty,
      number,
      correctAnswer,
      incorrectAnswers,
    } = this.props;
    const newAnswers = incorrectAnswers === undefined
      ? [] : [...incorrectAnswers, correctAnswer];
    const RANGE_ALEATORIETY = 0.5;
    const allAnswers = newAnswers.sort(() => Math.random() - RANGE_ALEATORIETY);
    return (
      <div>
        <h3
          data-testid="question-category"
        >
          Categoria:
          <span>{ category }</span>
        </h3>
        <p>
          Tipo:
          { type }
        </p>
        <p>
          Dificuldade:
          { difficulty }
        </p>
        <h2
          data-testid="question-text"
        >
          { `Questão ${number}: `}
          <span>{ question }</span>
        </h2>
        <div
          data-testid="answer-options"
        >
          { allAnswers.map((answer, index) => (
            <Button
              key={ answer }
              textMessage={ answer }
              id={ answer === correctAnswer
                ? 'correct-answer' : `wrong-answer-${index === 0 ? index : index - 1}` }
              disabled={ false }
              onClick={ answer === correctAnswer
                ? this.onClickCorrectAnswer
                : this.onClickIncorrectAnswer }
            />
          )) }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.string.isRequired,
  showBtnNext: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  currentSecond: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Question);
