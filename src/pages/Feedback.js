import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    const MIN_SCORE = 2;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
