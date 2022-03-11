import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      textMessage,
      id,
      disabled,
      onClick,
      className,
    } = this.props;
    return (
      <button
        type="button"
        id={ id }
        data-testid={ id }
        disabled={ disabled }
        onClick={ onClick }
        className={ className }
      >
        { textMessage }
      </button>
    );
  }
}

Button.propTypes = {
  textMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
