import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/button.css'


const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`genericButton ${className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
