// import React, { useEffect, useState } from 'react';
import '../../assets/css/statistics.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "../CustomDatePicker";

const Statistics = () => {
    const [startDate, setStartDate] = useState(new Date("2024-12-10"));
    const [endDate, setEndDate] = useState(new Date("2024-12-18"));
    const [salesData, setSalesData] = useState([]);
    const [summary, setSummary] = useState();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchSalesData();
    }, [startDate, endDate]);

    const fetchSalesData = async () => {
        try {
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = endDate.toISOString().split("T")[0];
            const response = await axios.get(
                `${baseUrl}/api/v2/tyra_plus_admin/admin/sales_count_by_date?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
            );
            const summaryData = await axios.get(
                `${baseUrl}/api/v2/tyra_plus_admin/admin/sales_stat?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
            );
            setSummary(summaryData.data);

            const data = response.data.map((item) => ({
                date: item.date,
                salesCount: item.sales_count,
            }));
            setSalesData(data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    return (
        <>
            <div className='statiticsContainer'>
                <CustomDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />

                {/* Summary Card */}
                <div className="summary-card">
                    <div className="summary-row">
                        <span className="summary-label">Регистрации</span>
                        <span className="summary-value">{summary?.registration_count}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Подписки</span>
                        <span className="summary-value">{summary?.sales_count}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Сумма</span>
                        <span className="summary-value total">{summary?.total_amount}</span>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <BarChart
                width={400}
                height={300}
                data={salesData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salesCount" fill="#007BFC" name="Sales Count" />
            </BarChart>
        </>
    );
};

export default Statistics;
