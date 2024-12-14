import '../../assets/css/app.css';
import React, { useEffect, useState } from 'react';
import icon from '../../assets/icons/client.png'
import SectionTitle from '../SectionTitle';
import ProfileInfo from '../ProfileInfo';


const Profile = ({ name, city, created_at, phone }) => {

    function transformDate(dateString) {
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    return (
        <>
            {/* picture and Role */}
            <div className="profile">
                <img src={icon} alt="Profile Icon" className="profileIcon" style={{ marginBottom: '20px' }} />
                <ProfileInfo userName={name} />
            </div>
            {/* Personal Details */}
            <div className="personal-details">
                <SectionTitle title='Личные данные' />
                <div className="input-field">
                    <label>Город</label>
                    <input type="text" value={city} readOnly />
                </div>
                <div className="input-field">
                    <label>Номер телефона</label>
                    <input type="text" value={phone} readOnly />
                </div>
                <div className="input-field">
                    <label>Дата регистрации</label>
                    <input type="text" value={transformDate(created_at)} readOnly />
                </div>
            </div>


        </>
    );
};

export default Profile;
