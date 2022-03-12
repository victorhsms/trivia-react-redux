import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankOrder = ranking.sort((a, b) => b.score - a.score);

    this.setState({
      ranking: rankOrder,
    });
  }

  handleClickBackHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((player, index) => {
          const { name, score, picture } = player;
          return (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          );
        })}
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
