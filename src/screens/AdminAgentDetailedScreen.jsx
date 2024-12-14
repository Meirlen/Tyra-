import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/app.css';
import Header from '../components/Header';
import Tab from '../components/Tab';  // We will create this component next
import UserProfile from '../components/admin-agents/UserProfile';
import Sales from '../components/admin-agents/Sales';

const AdminAgentDetailScreen = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('card');

  const tabs = [
    { name: 'Карточка', key: 'card' },
    { name: 'Продажи', key: 'sales' },
  ]; 

  return (
    <div className="dashboardListContainer">
         <Header title="Агент" />
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
        {activeTab === 'card' && (
         <UserProfile agentId={id}/>
        )}
        {activeTab === 'sales' && (
         <Sales id={id} />
        )}
      </>
    </div>
  );
}; 

export default AdminAgentDetailScreen;
