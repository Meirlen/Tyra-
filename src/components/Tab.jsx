// Tab.js
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/tab.css';

const Tab = ({ isActive, children, onClick }) => {
  return (
    <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
