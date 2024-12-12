import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PhoneInputScreen.css'
import axios from 'axios'
import { formatPhoneNumber } from '../assets/utils';

const PhoneInputScreen = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();


  const handleNext = async () => {
    const formattedPhone = phone.replace(/[^0-9]/g, ''); // Extract digits
    console.log("number",formattedPhone)
    if (formattedPhone.length === 11) {
      try {
        const response = await axios.post(`${baseUrl}/api/v2/tyra_plus/user/login_by_phone`, {
          phone_number: formattedPhone
        });

        console.log('API response:', response.data);

        // Navigate to the next screen with phone as state
        navigate('/code-input', { state: { phone: formattedPhone } });
      } catch (error) {
        alert(error.response.data.detail);
        console.error('Failed to login:', error);
      }
    } else {
      alert('Please enter a valid phone number');
    }
  };


  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log("api url", baseUrl)

  return (
    <div className="phoneInputScreen">
      <div className='phoneInputScreenHeading'>Укажите телефон</div>
      <div className='phoneInputScreenSubHeading'>Мы пришлем SMS-код для входа</div>
      <input
        type="tel"
        placeholder="+ 7 _ _ _ - _ _ _ - _ _ - _ _"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
        className="phoneInputScreenInput"
      />
      <button onClick={handleNext} className="phoneInputScreenbutton">Дальше</button>
    </div>
  );
};

export default PhoneInputScreen;