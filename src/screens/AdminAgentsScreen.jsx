import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TransactionEntry from '../components/TransactionEntry';


const AdminAgentsScreen = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      const fetchAgents = async () => {
          try {
              const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/agents_stats`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if (response?.data) {
                  setAgents(response.data);
              }
              else {
                  alert(response.detail);
              }
          } catch (error) {
              alert(error.response?.data?.detail);
              console.error('Failed to fetch Agents:', error);
          }
      };

      fetchAgents();
  }, [baseUrl]);

  const handleAgentClick = (id) => { navigate(`/admin-dashboard/agent/${id}`); };
  return(
   <div className="dashboardListContainer">
        <Header title="Агенты" />
        {agents.map((agent, index) => (
          <TransactionEntry key={index} title={agent?.user_name} agent="Количество продаж" 
          amount={`${agent?.total_sales_amount} ₸`} status={agent?.total_sales_count.toString()} 
          onClick={()=>{handleAgentClick(agent.id)}}
          />
        ))}
  
      </div>
);
}
export default AdminAgentsScreen;
