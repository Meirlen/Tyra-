import PhoneInputScreen from './screens/PhoneInputScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodeInputScreen from './screens/CodeInputScreen';
import RegistrationScreen from './screens/RegisterationScreen';
import SupervisorScreen from './screens/SupervisorScreen';
import WithdrawlHistoryScreen from './screens/WithdrawlHistoryScreen';
import MyAgentsScreen from './screens/MyAgentsScreen';
import TransactionHistory from './screens/TransactionHistory';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
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
      </Routes>
    </Router>
    </>
  )
}

export default App
