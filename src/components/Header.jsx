import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/css/components/header.css'

const Header = ({ title }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <header className="header">
            <button className="back-button" onClick={handleGoBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.57007 5.92993L3.50007 11.9999L9.57007 18.0699" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.5 12H3.67" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <h1>{title}</h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
