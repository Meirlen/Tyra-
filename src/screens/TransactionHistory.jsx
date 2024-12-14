import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../assets/css/transactionHistory.css';
import Header from '../components/Header';
import TransactionEntry from '../components/TransactionEntry';
import { formatDate } from '../assets/utils';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const location = useLocation()
    const state = location.state

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus/sales`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("transactionScreen", response.data)
                setTransactions(response.data);
            } catch (error) {
                alert(error.response.data.detail)
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, [baseUrl]);



    const groupByDate = (data) => {
        return data.reduce((acc, transaction) => {
            const date = formatDate(transaction.purchase_date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    const groupedTransactions = groupByDate(transactions);

    return (
        <div className="transaction-history">
            <Header title="История поступлений" />
            {Object.keys(groupedTransactions).map((date, index) => (
                <div key={index} className="transaction-date">
                    <p>{date}</p>
                    {groupedTransactions[date].map((transaction, idx) => {
                        const amount = state?.profile?.role === 'agent' ? transaction.agent_bonus : transaction.superviser_bonus;
                        return (
                            <TransactionEntry
                                key={idx}
                                title={transaction.client_name}
                                agent={transaction.agent.user_name}
                                amount={`${amount} ₸`}
                                status="Оплата"
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    );
};

export default TransactionHistory;
