import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import User from './Components/User';
import BankAccounts from './Components/BankAccounts';
import Transaction from './Components/Transaction';
import TransactionDetails from './Components/TransactionDetalis';
import Talk from './Components/Talk'
import BankAccountDetails from './Components/BankAccountDetalis';
import LoginPage from './Components/LoginPage'; // Импортируем компонент LoginPage
import Cookies from 'js-cookie';
import TalkHistory from './Components/TalkHistory';
import { useState, useEffect } from 'react';
import instance from './Services/axiosInstance'; // используем axios instance для запросов
import AdminPanel from './Components/AdminPanel';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProtectedRoute = ({ element, ...rest }) => {
  const token = Cookies.get('BEARER');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get('BEARER');
    if (token) {
      instance.get("users/me")
        .then(response => {
          const userData = response.data;
          setUserRole(userData.role);

          Cookies.set('USER_DATA', JSON.stringify(userData));
        })
        .catch(error => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('BEARER');
    setUserRole(null);
    Cookies.remove('USER_DATA');
    window.location.href = '/login'; // Перенаправление на страницу входа
  };


  return (
    <Router>
      <div className="App">
        {Cookies.get('BEARER') !== undefined && <Header onLogout={handleLogout} userRole={userRole}/>}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/"element={<ProtectedRoute element={<Content />}/>}/>
          <Route path="/me" element={<ProtectedRoute element={<User />} />} />
          <Route path="/talks" element={<ProtectedRoute element={<Talk />} />} />
          <Route path="/talks/:id" element={<ProtectedRoute element={<TalkHistory/>} />} />
          <Route path="/bank_accounts" element={<ProtectedRoute element={<BankAccounts />} />} />
          <Route path="/bank_accounts/:id" element={<ProtectedRoute element={<BankAccountDetails/>} />} />
          <Route path="/transactions" element={<ProtectedRoute element={<Transaction />} />} />
          <Route path="/transactions/:id" element={<ProtectedRoute element={<TransactionDetails />} />} />
          <Route path="/admin" element={userRole === 'ROLE_ADMIN' ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
        {Cookies.get('BEARER') !== undefined && <Footer />}
      </div>
    </Router>
  );
}

export default App;
