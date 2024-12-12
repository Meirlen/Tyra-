import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/registrationScreen.css';

const RegistrationScreen = () => {
  const location = useLocation();
  const profile = location.state?.profile;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    supervisorId:'',
    phone: profile?.phone_number || '', // Pre-fill with phone number from profile
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');

    const registrationData = {
      user_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: 'agent',
      superviser_bonus_code: formData.supervisorId,
    };

    try {
      const response = await axios.put(`${baseUrl}/api/v2/tyra_plus/user`, registrationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Registration response:', response.data);
      // Navigate to the supervisor/profile screen after successful registration
      navigate('/supervisor', { state: { profile: response.data } });
    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="RegisterationScreen">
      <div className='registrationScreenHeading'>Регистрация агента</div>

      <div className="form-group" style={{ marginTop: '30px' }}>
        <div className='registrationScreenLabel' htmlFor="firstName">Имя</div>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="registrationScreenInput"
        />
      </div>
      <div className="form-group">
        <div className='registrationScreenLabel' htmlFor="lastName">Фамилия</div>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="registrationScreenInput"
        />
      </div>
      <div className="form-group">
        <div className='registrationScreenLabel' htmlFor="email">EMAIL</div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="registrationScreenInput"
        />
      </div>
      <div className="form-group">
        <div className='registrationScreenLabel' htmlFor="phone">телефон</div>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="registrationScreenInput"
        />
      </div>
      <div className="form-group">
        <div className='registrationScreenLabel' htmlFor="supervisorId">id супервайзера</div>
        <input
          type="text"
          id="supervisorId"
          name="supervisorId"
          value={formData.supervisorId}
          onChange={handleChange}
          className="registrationScreenInput"
        />
      </div>

      <button onClick={handleSubmit} className="registrationScreenButton">Далее</button>
    </div>
  );
};

export default RegistrationScreen;
