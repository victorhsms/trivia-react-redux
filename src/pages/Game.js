import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../services/getQuestions';
import getNewToken from '../services/getNewToken';
import Question from '../components/Question';
import Button from '../components/Button';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: [],
      numberQuestion: 0,
      nextQuestion: false,
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    let questions = await getQuestions(token);
    console.log(' asiajsoiajsioajsoijaiosjaios', questions);
    if (questions.length === 0) {
      console.log('AQUI AQUI AQUI', questions);
      const newToken = await getNewToken();
      questions = await getQuestions(newToken);
    }
    this.setState({
      allQuestions: questions,
    });
  }

  showBtnNext = () => {
    this.setState({
      nextQuestion: true,
    });
  }

  goToNextQuestion = () => {
    const { numberQuestion } = this.state;
    const LAST_QUESTION = 4;
    if (numberQuestion < LAST_QUESTION) {
      this.setState({
        numberQuestion: numberQuestion + 1,
        nextQuestion: false,
      });
    }
  }

  render() {
    const { allQuestions, numberQuestion, nextQuestion } = this.state;
    let renderQuestion;
    if (allQuestions === []) {
      renderQuestion = [];
    } else {
      renderQuestion = [allQuestions[numberQuestion]];
    }
    if (renderQuestion[0] === undefined) {
      renderQuestion.shift();
    }
    console.log(renderQuestion);
    return (
      <div>
        <Header />
        {renderQuestion.map((asks, index) => {
          const {
            category,
            type,
            difficulty,
            question,
            correct_answer: correctAnswer,
            incorrect_answers: incorrectAnswers,
          } = asks;

          return (
            <Question
              key={ index }
              category={ category }
              number={ index }
              type={ type }
              difficulty={ difficulty }
              question={ question }
              correctAnswer={ correctAnswer }
              incorrectAnswers={ incorrectAnswers }
              showBtnNext={ this.showBtnNext }
            />
          );
        })}
        { nextQuestion && (
          <Button
            textMessage="Next"
            id="btn-next"
            disabled={ false }
            onClick={ this.goToNextQuestion }
          />
        )}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Game);
