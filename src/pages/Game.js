import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../services/getQuestions';
import getNewToken from '../services/getNewToken';
import Question from '../components/Question';
import Button from '../components/Button';

const TIME = 1000;

class Game extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: [],
      numberQuestion: 0,
      seconds: 30,
      disabledButtons: false,
      activeTime: true,
      nextQuestion: false,
      correctclass: '',
      wrongclass: '',
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    let questions = await getQuestions(token);
    if (questions.length === 0) {
      const newToken = await getNewToken();
      questions = await getQuestions(newToken);
    }
    this.setState({
      allQuestions: questions,
    });

    this.initTimer();
  }

  componentDidUpdate() {
    this.stopTime();
  }

  initTimer = () => {
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, TIME);
  }

  stopTime = () => {
    const { seconds, activeTime } = this.state;
    if (seconds === 0 && activeTime) {
      clearInterval(this.myInterval);
      this.setState({
        disabledButtons: true,
        activeTime: false,
      });
      this.showBtnNext();
      this.changeColor();
    }
  }

  showBtnNext = () => {
    this.setState({
      nextQuestion: true,
    });
  }

  changeColor = () => {
    this.setState({
      correctclass: 'correct-answer',
      wrongclass: 'wrong-answer',
    });
  }

  goToNextQuestion = () => {
    const { numberQuestion } = this.state;
    const LAST_QUESTION = 4;
    if (numberQuestion < LAST_QUESTION) {
      this.setState({
        numberQuestion: numberQuestion + 1,
        nextQuestion: false,
        seconds: 30,
        correctclass: '',
        wrongclass: '',
        disabledButtons: false,
        activeTime: true,
      });
      this.initTimer();
    } else {
      const { history } = this.props;
      history.push('/feedback');
      this.finalScore();
    }
  }

  finalScore = () => {
    const { score, name } = this.props;
    const imgGravatar = localStorage.getItem('gravatarUrl');
    const currentPlayer = {
      name,
      score,
      picture: imgGravatar,
    };

    const rankingStorage = localStorage.getItem('ranking');
    const ranking = rankingStorage ? JSON.parse(rankingStorage) : [];

    if (ranking.length !== 0) {
      const newRanking = [...ranking, currentPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      const newRanking = [currentPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  render() {
    const {
      allQuestions,
      numberQuestion,
      seconds,
      disabledButtons,
      nextQuestion,
      correctclass,
      wrongclass,
    } = this.state;
    let renderQuestion;
    if (allQuestions === []) {
      renderQuestion = [];
    } else {
      renderQuestion = [allQuestions[numberQuestion]];
    }
    if (renderQuestion[0] === undefined) {
      renderQuestion.shift();
    }
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
            <>
              <Question
                key={ index }
                category={ category }
                number={ numberQuestion }
                type={ type }
                difficulty={ difficulty }
                question={ question }
                correctAnswer={ correctAnswer }
                incorrectAnswers={ incorrectAnswers }
                disabled={ disabledButtons }
                currentSecond={ seconds }
                showBtnNext={ this.showBtnNext }
                correctclass={ correctclass }
                wrongclass={ wrongclass }
                changeColor={ this.changeColor }
                stop={ this.myInterval }
              />
              <h3>{ `Tempo restante: ${seconds}` }</h3>
            </>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Game);
