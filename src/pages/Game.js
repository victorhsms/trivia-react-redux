import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { tokenController } from '../actions/index';
import getQuestions from '../services/getQuestions';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      allQuestions: [],
      numberQuestion: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(tokenController());
    this.startGame();
  }

  showQuestion= () => {}

  startGame = async () => {
    const { token, dispatch } = this.props;
    let questions = await getQuestions(token);
    if (questions === []) {
      Storage.removeItem('token');
      dispatch(tokenController());
      questions = await getQuestions(token);
    }
    console.log(questions);
    this.setState({
      allQuestions: questions,
    });
  }

  render() {
    const { allQuestions } = this.state;
    // const questionOne = allQuestions[numberQuestion];
    // console.log(questionOne.question);
    return (
      <div>
        <Header />
        {allQuestions.map((asks, index) => {
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
            />
          );
        })}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Game);
