import React, { useEffect, useState } from 'react';
import '../../assets/css/myAgentsScreen.css';
import axios from 'axios';
import { formatRussianDate } from '../../assets/utils';
import TransactionEntry from '../../components/TransactionEntry';


const Agents = ({id}) => {
    const [agents, setAgents] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/agents/superviser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response?.data) {
                    setAgents(response.data);
                }
               
            } catch (error) {
                alert(error.response?.data?.detail);
                console.error('Failed to fetch Agents:', error);
            }
        };

        fetchAgents();
    }, [baseUrl]);

    return (
        <div className="my-agents">
            {agents.map((agent, index) => (
                <TransactionEntry key={index} title={agent?.user_name} agent={formatRussianDate(agent?.created_at)} amount={agent?.total_amount} status={agent?.total_sales.toString()} />
            ))}
        </div>
    );
};

export default Agents;
