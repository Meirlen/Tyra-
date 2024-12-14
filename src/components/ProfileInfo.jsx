// ProfileInfo.js
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/profileInfo.css'
import { formatPhoneNumber } from '../assets/utils';
const ProfileInfo = ({ userName, phoneNumber =''}) => {
  

  return (
    <div className="profileInfo">
      <div className="userName">{userName}</div>
      <div className="phoneNumber">{formatPhoneNumber(phoneNumber)}</div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userName: PropTypes.string,
  phoneNumber: PropTypes.string,
};

export default ProfileInfo;
