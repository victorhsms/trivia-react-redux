import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <div>
        <div>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt={ name } />
        </div>
        <div data-testid="header-player-name">
          Nome:
          { name }
        </div>
        <div data-testid="header-score">
          Placar:
          { score }
        </div>
      </div>

    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
