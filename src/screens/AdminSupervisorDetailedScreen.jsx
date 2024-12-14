import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/app.css';
import Header from '../components/Header';
import Tab from '../components/Tab';  // We will create this component next
import UserProfile from '../components/admin-agents/UserProfile';
import Agents from '../components/admin-supervisors/Agents';
import SSales from '../components/admin-supervisors/Sales';

const AdminSupervisorDetailScreen = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('card');

  const tabs = [
    { name: 'Карточка', key: 'card' },
    { name: 'Агенты', key: 'agents' },
    { name: 'Продажи', key: 'sales' },
  ];

  return (
    <div className="dashboardListContainer">
         <Header title="Супервайзер" />
      {/* <h2>Информация о супервайзере {id}</h2> */}
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
        {activeTab === 'agents' && (
         <Agents id={id}/>
        )}
        {activeTab === 'sales' && (
         <SSales id={id}/>
        )}
      </>
    </div>
  );
};

export default AdminSupervisorDetailScreen;
