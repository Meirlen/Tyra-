import '../assets/css/app.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatPhoneNumber } from '../../assets/utils';
import icon from '../assets/icons/user.png'
import SectionTitle from '../SectionTitle';
import ProfileInfo from '../ProfileInfo';
import BalanceSection from '../BalanceSection';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        "id": 1,
        "client_name": "Ип Амалбеков",
        "agent": { "id": 3, "user_name": "testing namr", "email": "testing@gmail.com", "role": "agent" },
        "agent_bonus": 8000,
        "phone_number": 2000,
        "agent_bonus_code": "713946",
        "superviser_bonus_code": "923983",
        "created_at": "2024-12-12T13:23:08.559628",
        "purchase_amount": 30000.0
    });
    const navigate = useNavigate();
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

    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <>
            {/* picture and Role */}
            <div className="profile">
                <img src={icon} alt="Profile Icon" className="profileIcon" style={{marginBottom:'20px'}} />
                <ProfileInfo userName="Алексей" phoneNumber="79194532323" />
            </div>

            <BalanceSection title="Баланс" balance="000"/>
            {/* Personal Details */}
            <div className="personal-details">
                <SectionTitle title='Личные данные' />
                <div className="input-field">
                    <label>Номер телефона</label>
                    <input type="text" value={profile?.phone_number} readOnly />
                </div>
                <div className="input-field">
                    <label>Дата регистрации</label>
                    <input type="text" value={transformDate(profile?.created_at)} readOnly />
                </div>
                <div className="input-field">
                    <label>Ваш супервайзер</label>
                    <input type="text" value={profile.superviser_bonus_code ? profile.superviser_bonus_code : ''} readOnly />
                </div>
            </div>


        </>
    );
};

export default UserProfile;
