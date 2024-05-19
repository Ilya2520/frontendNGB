import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import instance from '../Services/axiosInstance'; // используем axios instance для запросов
import { API_ENDPOINTS } from '../constants';
import './styles/modal.css';
import { Card, Spinner, Container, Button, Form, Modal } from 'react-bootstrap';


const BankAccountDetails = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState(0);
  const [bankAccount, setBankAccount] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBankAccount();
  }, []);


  const fetchBankAccount = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.BANK_ACCOUNTS + `/${id}`);
      setBankAccount(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const handleBack = () =>{
    window.location.href='/bank_accounts';
  }

  const handleDelete = async () => {
    //
  };

  const handleEdit = () => {
    // Здесь можно добавить логику для редактирования банковского аккаунта
    // Например, можно открыть форму редактирования или перейти на другую страницу
  };

  const handleCreateTransaction = async (event) => {
    event.preventDefault();
    const data = { from:id, to, amount, text };
    try {
      // Отправляем POST-запрос для создания новой беседы
      console.log(data); 
      const res = await instance.post(API_ENDPOINTS.TRANSACTION_CREATE, data);
      console.log(res.data); 

      setTo(0);
      setAmount(0);
      setText('');
      setShowForm(false)
      fetchBankAccount();
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-4" style={{ minHeight: '50vh' }}>
      {bankAccount ? (
        <Card style={{ width: 'auto', marginTop: '2rem' }}>
          <Card.Body>
            <Card.Title>Детали банковского аккаунта</Card.Title>
            <Card.Text>
              <p>ID: {bankAccount.id}</p>
              <p>User Email: {bankAccount.user_email}</p>
              <p>Status: {bankAccount.status}</p>
              <p>Amount: {bankAccount.amount}</p>
              <p>Conditions: {bankAccount.conditions}</p>
              <p>User ID: {bankAccount.userId}</p>
              <p>Type: {bankAccount.type}</p>
            </Card.Text>
            <Container className="d-flex mt-3">
              <Button variant="secondary" onClick={handleBack} className="mt-3 me-2">Назад</Button>
              <Button variant="primary" onClick={() => setShowForm(true)} className="mt-3 me-2">Перевести</Button>
              <Button variant="success" onClick={handleEdit} className="mt-3 me-2">Изменить</Button>
              <Button variant="danger" onClick={handleDelete} className="mt-3 me-2">Удалить</Button>
            </Container>
            </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Создать транзакцию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTransaction}>
            <Form.Group controlId="to">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="number"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="text">
              <Form.Label>Text:</Form.Label>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
            <Button variant="primary" type="submit" className="mt-3">Оплатить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BankAccountDetails;
