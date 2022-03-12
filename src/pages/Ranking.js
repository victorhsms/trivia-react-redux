import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  handleClickBackHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          textMessage="Voltar para o Início"
          id="btn-go-home"
          disabled={ false }
          onClick={ this.handleClickBackHome }
        />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
