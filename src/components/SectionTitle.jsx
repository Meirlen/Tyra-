import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/sectionTitle.css';

const SectionTitle = ({ title }) => {
  return (
    <div className="sectionTitleContainer">
      <h4>{title}</h4>
      <div className="divider"></div>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
