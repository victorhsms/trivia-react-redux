import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      textMessage,
      id,
      type,
      name,
      placeholder,
      value,
      onChange,
    } = this.props;
    return (
      <label htmlFor={ id }>
        { textMessage }
        <input
          id={ id }
          data-testid={ id }
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  textMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
