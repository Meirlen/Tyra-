// AdminDashboardScreen.js
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../assets/css/app.css';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const AdminDashboardScreen = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      const fetchData = async () => {
          try {
              const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/statistics`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if (response?.data) {
                  setData(response.data);
              }
              
          } catch (error) {
              alert(error.response?.data?.detail);
              console.error('Failed to fetch statistics:', error);
          }
      };

      fetchData();
  }, [baseUrl]);
  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page in history
  };

  
  const cardData = [
    {
      id: 1,
      title: 'Супервайзеры',
      count: data.total_supervisors,
      update: `+ ${data.total_supervisors_today} сегодня`,
      route: '/admin-dashboard/supervisors'
    },
    {
      id: 2,
      title: 'Агенты',
      count: data.total_agents,
      update: `+ ${data.total_agents_today} сегодня`,
      route: '/admin-dashboard/agents'
    },
    {
      id: 3,
      title: 'Продажи',
      count: data.total_sales_count,
      update: `+ ${data.total_sales_count_today} сегодня`,
      route: '/admin-dashboard/sales'
    },
    {
      id: 4,
      title: 'Клиенты',
      count: data.total_clients,
      update: `+ ${data.total_clients_today} сегодня`,
      route: '/admin-dashboard/clients'
    }
  ];

  return (
    <div className="app">
      <div className='dashboardHeader'>
        <button className="back-button" onClick={handleGoBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.57007 5.92993L3.50007 11.9999L9.57007 18.0699" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5 12H3.67" stroke="#172D43" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg></button>
        <button className="edit-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20H21" stroke="#172D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z" stroke="#172D43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {cardData.map(item => (
        <Card
          key={item.id}
          title={item.title}
          count={item.count}
          update={item.update}
          navigateTo={() => navigate(item.route)}
        />
      ))}
    </div>
  );
};

export default AdminDashboardScreen;
