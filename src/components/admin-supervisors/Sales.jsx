import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/transactionHistory.css';
import Header from '../../components/Header';
import TransactionEntry from '../../components/TransactionEntry';
import { formatDate } from '../../assets/utils';

const SSales = ({id}) => {
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/admin/sales/all?agent_id=${id}&role=supervisor`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(response.data.length==0){
                    setMessage("No Sales Yet")
                }
                // console.log("array length",response.data.length)
                // console.log("transactionScreen", response.data)
                setTransactions(response.data);
            } catch (error) {
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
            {message && <h3>{message}</h3>}
            {Object.keys(groupedTransactions).map((date, index) => (
                <div key={index} className="transaction-date">
                    <p>{date}</p>
                    {groupedTransactions[date].map((transaction, idx) => (
                        <TransactionEntry
                            key={idx}
                            title={transaction.client_name}
                            agent={transaction.agent.user_name}
                            amount={`${transaction.superviser_bonus} ₸`}
                            status="Оплата"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SSales;
