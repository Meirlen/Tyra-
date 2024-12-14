import PhoneInputScreen from './screens/PhoneInputScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodeInputScreen from './screens/CodeInputScreen';
import RegistrationScreen from './screens/RegisterationScreen';
import SupervisorScreen from './screens/SupervisorScreen';
import WithdrawlHistoryScreen from './screens/WithdrawlHistoryScreen';
import MyAgentsScreen from './screens/MyAgentsScreen';
import TransactionHistory from './screens/TransactionHistory';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminSupervisorsScreen from './screens/AdminSupervisorsScreen';
import AdminAgentsScreen from './screens/AdminAgentsScreen'
import AdminCreateSupervisorScreen from './screens/AdminCreateSupervisorScreen';
import AdminSupervisorDetailScreen from './screens/AdminSupervisorDetailedScreen';
import AdminSalesScreen from './screens/AdminSalesScreen';
import AdminClientsScreen from './screens/AdminClientsScreen';
import AdminAgentDetailScreen from './screens/AdminAgentDetailedScreen';
import AdminClientDetailedScreen from './screens/AdminClientDetailedScreen';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PhoneInputScreen />} />
          <Route path="/code-input" element={<CodeInputScreen />} />
          <Route path="/registration" element={<RegistrationScreen />} />
          <Route path="/supervisor" element={<SupervisorScreen />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/withdrawl-history" element={<WithdrawlHistoryScreen />} />
          <Route path="/agents" element={<MyAgentsScreen />} />
          <Route path="/admin-dashboard" element={<AdminDashboardScreen />} />
          <Route path="/admin-dashboard/supervisors" element={<AdminSupervisorsScreen />} />
          <Route path="/admin-dashboard/supervisor/:id" element={<AdminSupervisorDetailScreen />} />
          <Route path="/admin-dashboard/agents" element={<AdminAgentsScreen />} />
          <Route path="/admin-dashboard/agent/:id" element={<AdminAgentDetailScreen />} />
          <Route path="/admin-dashboard/create-supervisor" element={<AdminCreateSupervisorScreen />} />
          <Route path="/admin-dashboard/sales" element={<AdminSalesScreen />} />
          <Route path="/admin-dashboard/clients" element={<AdminClientsScreen />} />
          <Route path="/admin-dashboard/client/:id" element={<AdminClientDetailedScreen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
