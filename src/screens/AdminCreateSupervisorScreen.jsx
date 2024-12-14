import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/css/app.css'
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle'
import axios from 'axios';

const AdminCreateSupervisorScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Pre-fill with phone number from profile
  });
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('authToken');
    const registrationData = {
      user_name: formData.name,
      phone_number: formData.phone,
    };

    try {
      const response = await axios.post(`${baseUrl}/api/v2/tyra_plus/create_superviser`, registrationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Registration response:', response.data);
      // Navigate to the supervisor/profile screen after successful registration
      navigate('/admin-dashboard/supervisors');
    } catch (error) {
      console.error('Supervisor Creation failed:', error);
      alert('Supervisor Creation failed. Please try again.');
    }
  }
  return (
    <div className="dashboardListContainer">
      <Header title="Новый супервайзер" />
      <Button onClick={handleCreate} className='buttonBottom'>Создать</Button>
      <SectionTitle title='Личные данные' />
      <div className='formContainer'>
        <div className="input-field">
          <label>Имя</label>
          <input type="text" value={formData.name} onChange={handleChange} name='name' />
        </div>
        <div className="input-field">
          <label>Номер телефона</label>
          <input type="text" value={formData.phone} onChange={handleChange} name='phone' />
        </div>
      </div>

    </div>
  );
}
export default AdminCreateSupervisorScreen;
