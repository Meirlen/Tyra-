import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/css/app.css'
import TransactionEntry from '../components/TransactionEntry';
import Button from '../components/Button';

const AdminSupervisorsScreen = () => {
  const navigate = useNavigate();
  const [supervisors, setSupervisors] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/admin/supervisors_stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data) {
          setSupervisors(response.data);
        }
        else {
          alert(response.detail);
        }
      } catch (error) {
        alert(error.response?.data?.detail);
        console.error('Failed to fetch Supervisors:', error);
      }
    };

    fetchSupervisors();
  }, [baseUrl]);
  const handleClick = () => {
    navigate('/admin-dashboard/create-supervisor')
  }
  const handleSupervisorClick = (id) => { navigate(`/admin-dashboard/supervisor/${id}`); };

  return (
    <div className="dashboardListContainer">
      <Header title="Супервайзеры" />

      {supervisors.map((supervisor, index) => (
        <TransactionEntry key={index} title={supervisor?.user_name} agent="Количество агентов" amount={`${supervisor?.total_sales_amount} ₸`} status={supervisor?.agents_count.toString()}
          value={supervisor?.total_sales_count.toString()} subHeading="Количество продаж" onClick={() => { handleSupervisorClick(supervisor.id) }}
        />
      ))}


      <Button onClick={handleClick} >Создать супервайзера</Button></div>

  );
}
export default AdminSupervisorsScreen;
