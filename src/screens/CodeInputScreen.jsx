import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/codeInputScreen.css';
import { formatPhoneNumber } from '../assets/utils';
import Button from '../components/Button';

const CodeInputScreen = () => {
  const location = useLocation();
  const [code, setCode] = useState('');
  const [resendTimer, setResendTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const phone = location.state?.phone || ''; // Retrieve the phone number

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);


  const handleNext = async () => {
    if (code.length === 6) {
      try {
        const response = await axios.post(`${baseUrl}/api/v2/tyra_plus/user/check_code`, {
          phone_number: phone,
          otp: code
        });

        console.log('API response:', response.data);

        if (response?.data?.data.token) {
          // Store the token in local storage
          const token = response.data.data.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));

          // Make second API call to fetch user profile
          const profileResponse = await axios.get(`${baseUrl}/api/v2/tyra_plus/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const profile = profileResponse.data;

          if(profile.role=='admin'){
             navigate('/admin-dashboard')
          }
          // Check if user_name is null
         else if (profile.user_name === null) {
            navigate('/registration', { state: { profile } }); // Navigate to Registration screen
          } 
          else {
            navigate('/supervisor', { state: { profile } }); // Navigate to Supervisor/Profile screen
          }


        } else {
          alert('Invalid code. Please try again.');
        }
      } catch (error) {
        console.log(error)
        alert(error.response?.data.detail);
        console.error('Failed to verify code:', error.response.data.detail);
      }
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page in history
  };

  const handleResend = async () => {
    if (canResend) {
      try {
        const response = await axios.post(`${baseUrl}/api/v2/tyra_plus/user/login_by_phone`, {
          phone_number: phone
        });

        console.log('API response:', response.data);
        setResendTimer(20);
        setCanResend(false);
      } catch (error) {
        console.error('Failed to resend code:', error);
      }
    }
  };

  return (
    <div className="codeInputScreen">
      <div style={{ width: '348px' }}>
        <div className="back-arrow" onClick={handleGoBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.57007 5.92993L3.50007 11.9999L9.57007 18.0699" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5 12H3.67" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className='codeInputScreenHeading'>Введите код</div>
      <div className='codeInputScreenSubHeading'>Мы отправили SMS-код на телефон </div>
      <div className='codeInputScreenPhoneNo'>{formatPhoneNumber(phone)} <span className='codeInputScreenEditButton' onClick={handleGoBack}>Изменить</span></div>
      <input
        type="text"
        placeholder=""
        maxLength="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="codeInputScreenInput"
      />
      <Button onClick={handleNext}>Дальше</Button>
      <div className="resend">Отправить повторно можно через:</div>
      <div className='codeInputScreenPhoneNo'>
        {`0:${resendTimer.toString().padStart(2, '0')}`}
        <span
          className={`codeInputScreenEditButton ${canResend ? 'active' : 'disabled'}`}
          onClick={handleResend}
          style={{ cursor: canResend ? 'pointer' : 'not-allowed' }}
        >
          Отправить
        </span>
      </div>
    </div>
  );
};

export default CodeInputScreen;
