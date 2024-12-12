import React, { useEffect, useState } from 'react';
import '../assets/css/myAgentsScreen.css';
import axios from 'axios';
import Header from '../components/Header';
import { formatRussianDate } from '../assets/utils';
import TransactionEntry from '../components/TransactionEntry';


const MyAgentsScreen = () => {
    const [agents, setAgents] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchAgents = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus/my_agents`, {
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

    return (
        <div className="my-agents">
            <Header title="Мои агенты" />
            {agents.map((agent, index) => (
                <TransactionEntry key={index} title={agent?.user_name} agent={formatRussianDate(agent?.created_at)} amount={agent?.total_sales_amount} status={agent?.total_sales_count.toString()} />
            ))}
        </div>
    );
};

export default MyAgentsScreen;
