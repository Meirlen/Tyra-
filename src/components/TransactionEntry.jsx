import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/components/transactionEntry.css'

const TransactionEntry = ({ title, agent, amount, status, date }) => (
    <div className="transaction-entry">
        <div className="transaction-info">
            <p className="title">{title}</p>
            {agent && <p className="agent">{agent}</p>}
            {date && <p className="date">{date}</p>}
        </div>
        <div className="transaction-status">
            {amount && <p className="amount">{amount}</p>}
            {status && <p className="status">{status}</p>}
        </div>
    </div>
);

TransactionEntry.propTypes = {
    title: PropTypes.string.isRequired,
    agent: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string
};

export default TransactionEntry;
