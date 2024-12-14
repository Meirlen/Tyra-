import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/transactionHistory.css';
import Header from '../../components/Header';
import TransactionEntry from '../../components/TransactionEntry';
import { formatDate } from '../../assets/utils';

const Sales = ({ id }) => {
    const [sales, setSales] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const fetchSales = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v2/tyra_plus_admin/admin/sales/all?agent_id=${id}&role=agent`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.length == 0) {
                    alert("No Sales yet")
                }
                setSales(response.data);
            } catch (error) {
                console.error('Failed to fetch sales:', error);
            }
        };

        fetchSales();
    }, [baseUrl]);


    const groupByDate = (data) => {
        return data.reduce((acc, sale) => {
            const date = formatDate(sale.purchase_date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(sale);
            return acc;
        }, {});
    };

    const groupedSales = groupByDate(sales);

    return (
        <div className="transaction-history">
            {Object.keys(groupedSales).map((date, index) => (
                <div key={index} className="transaction-date">
                    <p>{date}</p>
                    {groupedSales[date].map((sale, idx) => (
                        <TransactionEntry
                            key={idx}
                            title={sale?.client_name}
                            agent={`Агент ${sale?.agent_name}`}
                            amount={`${sale?.purchase_amount} ₸`}
                            status="Оплата"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Sales;