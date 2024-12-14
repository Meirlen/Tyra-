import '../assets/css/SupervisorScreen.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatPhoneNumber } from '../assets/utils';
import SectionTitle from '../components/SectionTitle';
import ProfileInfo from '../components/ProfileInfo';
import BalanceSection from '../components/BalanceSection';
import { IoIosLogOut } from "react-icons/io";
const SupervisorScreen = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const handleButtonClick = () => { window.open('https://wa.me/77711474766', '_blank'); };

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

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                console.log("profile Data", response.data)
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, [baseUrl]);

    const handleGoBack = () => {
        navigate(-1); // This will go back to the previous page in history
    };

    if (!profile) {
        return <div>Loading...</div>;
    }
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/')
    } // Redirect to login page or show login form
    return (
        <div className="supervisorScreen">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={handleGoBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.57007 5.92993L3.50007 11.9999L9.57007 18.0699" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.5 12H3.67" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></button>
                <button className='back-button' onClick={handleLogout}>
                    <IoIosLogOut style={{ width: "24px", height: '24px' }} />
                </button>

            </div>

            {/* ID and Role */}
            <div className="profile">
                <div className="profile-circle">
                    <p className="profile-id">Ваш ID:</p>
                    <h2 className="profile-number">{profile?.id}</h2>
                </div>
                <h3 className="profile-role">
                    {profile.role === 'superviser'
                        ? profile.role
                        : (
                            <>
                                <ProfileInfo userName={profile.user_name} phoneNumber={profile.phone_number} />
                            </>
                        )
                    }
                </h3>

            </div>

            <BalanceSection title="Баланс" balance={profile?.balance} buttonText="Вывести" onButtonClick={handleButtonClick} />

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

            {/* Buttons Section */}
            <div className="buttons-section">
                <button className="green-button" onClick={() => { navigate('/transaction-history', { state: { profile } }) }}>поступления</button>
                <button className="blue-button" onClick={() => { navigate('/withdrawl-history') }}>операции</button>
                {profile.role === 'superviser'
                    ? (<><button className="primary-button" onClick={() => { navigate('/agents') }}>Мои агенты</button></>)
                    : (
                        <>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SupervisorScreen;
