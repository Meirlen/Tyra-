// BalanceSection.js
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/balanceSection.css';

const BalanceSection = ({ title, balance, buttonText, onButtonClick }) => {
  return (
    <div className="balance-section">
      <div className="extra-circle"></div>
      <div className="balance-info">
        <p>{title}</p>
        <h2>{balance} ₸</h2>
      </div>
      {buttonText && onButtonClick && (
        <button onClick={onButtonClick} className="withdraw-button">
          {buttonText}
        </button>
      )}
    </div>
  );
};

BalanceSection.propTypes = {
  title: PropTypes.string,
  balance: PropTypes.number,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default BalanceSection;
