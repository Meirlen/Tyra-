import '../../assets/css/app.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatPhoneNumber } from '../../assets/utils';
import icon from '../../assets/icons/user.png'
import SectionTitle from '../SectionTitle';
import ProfileInfo from '../ProfileInfo';
import BalanceSection from '../BalanceSection';

const UserProfile = ({ agentId }) => {
    const [profile, setProfile] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/user/profile?user_id=${agentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response?.data) {
                    setProfile(response.data);
                }
                else {
                    alert(response.detail);
                }
            } catch (error) {
                alert(error.response?.data?.detail);
                console.error('Failed to fetch Profile:', error);
            }
        };

        fetchProfile();
    }, [baseUrl]);

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
                <ProfileInfo userName={profile?.user_name} phoneNumber={formatPhoneNumber(profile?.phone_number)} />
            </div>

            <BalanceSection title="Баланс" balance={profile?.balance} />
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
                {profile?.role == 'agent' ? (<><div className="input-field">
                    <label>Ваш супервайзер</label>
                    <input type="text" value={profile?.superviser_bonus_code ? profile?.superviser_bonus_code : ''} readOnly />
                </div></>) : (<></>)}

            </div>


        </>
    );
};

export default UserProfile;
