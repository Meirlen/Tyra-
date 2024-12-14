import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/app.css';
import Header from '../components/Header';
import Tab from '../components/Tab';  // We will create this component next
import Statistics from '../components/admin-sales/Statistics';
import Sales from '../components/admin-sales/Sales';

const AdminSalesScreen = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('statistics');

  const tabs = [
    { name: 'Статистика', key: 'statistics' },
    { name: 'Продажи', key: 'sales' },
  ];

  return (
    <div className="dashboardListContainer">
      <Header title="Продажи" />
      <div className="tabs">
        {tabs.map(tab => (
          <Tab
            key={tab.key}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </Tab>
        ))}
      </div>
      <>
        {activeTab === 'statistics' && (
          <Statistics />
        )}
        {activeTab === 'sales' && (
         <Sales/>
        )}
      </>
    </div>
  );
};

export default AdminSalesScreen;
