import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import Cookies from 'js-cookie';
import instance from '../Services/axiosInstance'; // используем axios instance для запросов
import { API_ENDPOINTS } from '../constants';
import { Container, Form, Button,Col,Row } from 'react-bootstrap';

const LoginPage = (onLoginSuccess) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('BEARER');
    if (token) {
      navigate('/'); // Перенаправление на основную страницу, если токен уже существует
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = { email, password };

    try {
      let res = await instance.post(API_ENDPOINTS.LOGIN, data);
      setSuccessMessage(res.data.message);
      const userRes = await instance.get('/users/me');
      const userData = userRes.data;
      Cookies.set('USER_DATA', JSON.stringify(userData));
      window.location.href = '/';
    } catch (err) 
    {
      if (err.response && err.response.data.code === 401) {
      setError("Не существует пользователя");
    }
    else if(err.response.data.message){ 
      setError(err.response.data.message);
  }
  else {
    setError("Ошибка при входе");
  }
    }
  };

  const handleRegister = async () => {
    try {
      // Выполняем регистрацию
      let res = await instance.post(API_ENDPOINTS.REGISTER, { email, password });
      setSuccessMessage(res.data.message);
      // Обновляем страницу после успешной регистрации
      window.location.reload();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 w-200">
      <div className="login-form p-4">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-2">Login</Button>
          <Button variant="secondary" onClick={handleRegister} className="w-100">Register</Button>
        </Form>
        {error && <div className="error text-center mt-3">Error: {error}</div>}
        {successMessage && <div className="success text-center mt-3">{successMessage}</div>}
      </div>
    </Container>
  );
};


export default LoginPage;
