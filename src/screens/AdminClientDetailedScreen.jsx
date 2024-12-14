import React,{useState} from 'react';
import { useParams ,useLocation} from 'react-router-dom';
import '../assets/css/app.css';
import Header from '../components/Header';
import Tab from '../components/Tab';  // We will create this component next
import Profile from '../components/admin-clients/profile';
import Payments from '../components/admin-clients/payments';

const AdminClientDetailedScreen = () => {
  const { id } = useParams();
  const location = useLocation(); 
  const client = location.state;

  console.log("client selected",client.client)
  const [activeTab, setActiveTab] = React.useState('card');

  const tabs = [
    { name: 'Карточка', key: 'card' },
    { name: 'Платежи', key: 'payments' },
  ]; 

  return (
    <div className="dashboardListContainer">
         <Header title="Клиент" />
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
            <Profile name={client?.client?.client_name} phone={client?.client?.phone_number} city={client?.client?.city} created_at={client?.client?.created_at} />
        )}
        {activeTab === 'payments' && (
         <Payments id={id}/>
        )}
      </>
    </div>
  );
};

export default AdminClientDetailedScreen;
