import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/transactionEntry.css'

const TransactionEntry = ({ title, agent, amount, status, date,subHeading,value,onClick }) => (
    <div className="transaction-entry" onClick={onClick}>
        <div className="transaction-info">
            <p className="title">{title}</p>
            {agent && <p className="agent">{agent}</p>}
            {subHeading && <p className="agent">{subHeading}</p>}
            {date && <p className="date">{date}</p>}

        </div>
        <div className="transaction-status">
            {amount && <p className="amount">{amount}</p>}
            {status && <p className="status">{status}</p>}
            {value && <p className="status">{value}</p>}
        </div>
    </div>
);

TransactionEntry.propTypes = {
    title: PropTypes.string.isRequired,
    agent: PropTypes.string,
    subHeading:PropTypes.string,
    value:PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
     onClick: PropTypes.func
};

export default TransactionEntry;
