import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { Analytics } from './components/Analytics';
import { RoleList } from './components/roles/RoleList';
import { UserList } from './components/users/UserList';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardStats />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;