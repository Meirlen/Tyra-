import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; // Icon for the calendar
import "../assets/css/CustomDatePicker.css"; // Custom styles for the date picker

const CustomDatePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <div className="date-picker-container">
            {/* Calendar Icon */}
            <div className="date-picker-icon">
                {/* <FaCalendarAlt /> */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 1.5V4.5" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 1.5V4.5" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.25 7.5H15.75" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.25 10.5H5.25833" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.75 13.5H12.7583" stroke="#7B8190" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>

            {/* Start Date */}
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyyy"
                customInput={
                    <input className="date-picker-input" readOnly />
                }
            />

            {/* Arrow Separator */}
            <div className="date-picker-separator"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1.75L2.33325 4.08333L4.66659 6.41667" stroke="#7B8190" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.33325 4.08325H11.6666" stroke="#7B8190" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.33325 12.2499L11.6666 9.91659L9.33325 7.58325" stroke="#7B8190" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.6666 9.91675H2.33325" stroke="#7B8190" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>

            {/* End Date */}
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd-MM-yyyy"
                customInput={
                    <input className="date-picker-input" readOnly />
                }
            />
        </div>
    );
};

export default CustomDatePicker;