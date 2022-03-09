import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      textMessage,
      id,
      disabled,
      onClick,
    } = this.props;
    return (
      <button
        type="button"
        id={ id }
        data-testid={ id }
        disabled={ disabled }
        onClick={ onClick }
      >
        { textMessage }
      </button>
    );
  }
}

Button.propTypes = {
  textMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
