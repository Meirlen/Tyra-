import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import TransactionEntry from '../components/TransactionEntry';


const AdminClientsScreen = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/admin/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data) {
          setClients(response.data);
        }
        else {
          alert(response.detail);
        }
      } catch (error) {
        alert(error.response?.data?.detail);
        console.error('Failed to fetch Agents:', error);
      }
    };

    fetchClients();
  }, [baseUrl]);
  const handleClientClick = (id) => { navigate(`/admin-dashboard/agent/${id}`); };
  return (
    <div className="dashboardListContainer">
      <Header title="Клиенты" />
      {clients.map((client, index) => (
        <TransactionEntry key={index} title={client?.client_name} agent={`Агент ${client?.agent_name}`}
          amount={`${client?.pay_sum} ₸`} status='Оплата'
          onClick={() => { navigate(`/admin-dashboard/client/${client?.id}`, { state: { client } }); }}
        />
      ))}

    </div>
  );
}
export default AdminClientsScreen;
