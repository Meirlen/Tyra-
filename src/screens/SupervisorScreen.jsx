import '../assets/css/SupervisorScreen.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatPhoneNumber } from '../assets/utils';

const SupervisorScreen = () => {
    const [profile, setProfile] = useState(null);
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
    return (
        <div className="supervisorScreen">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={handleGoBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.57007 5.92993L3.50007 11.9999L9.57007 18.0699" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.5 12H3.67" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></button>
                {/* <button className="edit-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20H21" stroke="#172D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z" stroke="#172D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button> */}
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
                               <div style={{textAlign:'center'}}> {profile?.user_name}</div>
                          
                                <span style={{ color: '#7B8190', fontSize: '14px', fontWeight: '400' ,textAlign:'center'}}>{formatPhoneNumber(profile?.phone_number)}</span>
                            </>
                        )
                    }
                </h3>

            </div>

            {/* Balance Section */}
            <div className="balance-section">
                <div class="extra-circle"></div>
                <div className="balance-info">
                    <p>Баланс</p>
                    <h2>{profile?.balance} ₸</h2>
                </div>
                <button onClick={() => window.open('https://wa.me/77711474766', '_blank')} className="withdraw-button">Вывести</button>
            </div>

            {/* Personal Details */}
            <div className="personal-details">
                <h4>Личные данные</h4>
                <div className='divider'></div>
                {/* <div className="input-field">
                    <label>Город</label>
                    <input type="text" value={profile?.city} readOnly />
                </div> */}
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
                <button className="green-button" onClick={() => { navigate('/transaction-history') }}>поступления</button>
                <button className="blue-button" onClick={() => { navigate('/withdrawl-history') }}>операции</button>
                {profile.role === 'superviser'
                    ? (<><button className="primary-button" onClick={() => { navigate('/agents') }}>Мои агенты</button></>)
                    : (
                        <>
                        </>
                    )
                }

                {/* <button  className="primary-button" onClick={() => { navigate('/agents') }}>Мои агенты</button> */}

            </div>
        </div>
    );
};

export default SupervisorScreen;
