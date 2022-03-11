import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      allAnswers: [],
    };
  }

  componentDidMount() {
    const {
      correctAnswer,
      incorrectAnswers,
    } = this.props;

    const newAnswers = incorrectAnswers === undefined
      ? [] : [...incorrectAnswers, correctAnswer];
    const RANGE_ALEATORIETY = 0.5;
    const allAnswers = newAnswers.sort(() => Math.random() - RANGE_ALEATORIETY);

    this.setState({
      allAnswers,
    });
  }

  onClickCorrectAnswer = () => {
    const { showBtnNext } = this.props;
    showBtnNext();
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
      disabled,
    } = this.props;

    const { allAnswers } = this.state;
    return (
      <div>
        <h3
          data-testid="question-category"
        >
          Categoria:&nbsp;
          <span>{ category }</span>
        </h3>
        <p>
          Tipo:&nbsp;
          { type }
        </p>
        <p>
          Dificuldade:&nbsp;
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
              disabled={ disabled }
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
  disabled: PropTypes.bool.isRequired,
  showBtnNext: PropTypes.func.isRequired,
};

export default Question;
