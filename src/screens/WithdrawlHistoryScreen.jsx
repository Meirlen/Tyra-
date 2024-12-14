import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../assets/utils';
import '../assets/css/withdrawlHistoryScreen.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TransactionEntry from '../components/TransactionEntry';


const WithdrawlHistoryScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus/transactions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response?.data) {
                    if (response?.data.length == 0) {
                        setMessage("There is no Transaction")
                    }
                    console.log("length", response?.data.length)
                }
                setTransactions(response.data);
            } catch (error) {
                setMessage(error.response.data.detail)
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, [baseUrl]);



    const groupByDate = (data) => {
        return data.reduce((acc, transaction) => {
            const date = formatDate(transaction.date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    const groupedTransactions = groupByDate(transactions);
    return (
        <div className="withdrawalHistoryScreen">
            <Header title="История вывода" />
            {message && <h3>{message}</h3>}
            {Object.keys(groupedTransactions).map((date, index) => (
                <div key={index} className="transaction-date">
                    <p>{date}</p>
                    {groupedTransactions[date].map((transaction, idx) => (
                        <TransactionEntry
                            key={idx}
                            title={transaction.transaction_type}
                            amount={`${transaction.amount} ₸`}

                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WithdrawlHistoryScreen;
