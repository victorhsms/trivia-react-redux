import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingsButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ onClick }
      >
        Configurações
      </button>
    );
  }
}

SettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SettingsButton;
