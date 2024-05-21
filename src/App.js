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
  const token = Cookies.get('__Host-JWT');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  console.log("aaaa");
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('__Host-JWT');
    if (token) {
      instance.get("users/me")
        .then(response => {
          const userData = response.data;
          setUserRole(userData.role);
          setIsAuthenticated(true);
          Cookies.set('USER_DATA', JSON.stringify(userData));
        })
        .catch(error => {
          console.error("Failed to fetch user data:", error);
          setIsAuthenticated(false);
        });
    }
  }, []);
  
  const handleLogout = () => {
    Cookies.remove('__Host-JWT', { sameSite: 'Lax', secure: true });
    Cookies.remove('USER_DATA');
    setUserRole(null);
    setIsAuthenticated(false);
    window.location.href = '/login'; // Перенаправление на страницу входа
  };


  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} userRole={userRole}/>}
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
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
