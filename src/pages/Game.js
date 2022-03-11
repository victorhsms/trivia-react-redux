import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../services/getQuestions';
import getNewToken from '../services/getNewToken';
import Question from '../components/Question';

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

    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, TIME);
  }

  componentDidUpdate() {
    this.stopTime();
  }

  stopTime = () => {
    const { seconds, activeTime } = this.state;
    if (seconds === 0 && activeTime) {
      clearInterval(this.myInterval);
      this.setState({
        disabledButtons: true,
        activeTime: false,
      });
    }
  }

  render() {
    const { allQuestions, numberQuestion, seconds, disabledButtons } = this.state;
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
            <>
              <Question
                key={ index }
                category={ category }
                number={ index }
                type={ type }
                difficulty={ difficulty }
                question={ question }
                correctAnswer={ correctAnswer }
                incorrectAnswers={ incorrectAnswers }
                disabled={ disabledButtons }
              />
              <h3>{ `Tempo restante: ${seconds}` }</h3>
            </>
          );
        })}
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
