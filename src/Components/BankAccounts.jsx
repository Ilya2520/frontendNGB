import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Modal, Col,Row, Card } from 'react-bootstrap';
import instance from '../Services/axiosInstance'; 
import { API_ENDPOINTS } from '../constants';
import './styles/modal.css';

function BankAccounts() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankAccountTypes, setBankAccountTypes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBankAccounts();
    fetchBankAccountTypes();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.BANK_ACCOUNTS);
      setBankAccounts(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchBankAccountTypes = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.BANK_ACCOUNTS_TYPE);
      setBankAccountTypes(res.data);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleCreateBankAccount = async (event) => {
    event.preventDefault();
    const data = { id: selectedAccount };
    try {
      const res = await instance.post(API_ENDPOINTS.BANK_ACCOUNT_CREATE, data);
      fetchBankAccounts();
      setMessage(res.data.message);
      setShowForm(false);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleToAccount = (id) => {
    window.location.href = `/bank_accounts/${id}`;
  }

  return (
    <Container fluid>
      <h2>Ваши счета:</h2>
      <Button variant="primary" onClick={() => setShowForm(true)}>Создать новый счет</Button>
      
      <Container fluid className='mt-2'>
      <Row xs={1} md={4} className="g-4">
      {bankAccounts.map((account) => (
        <Col>
        <Card key={account.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Счет №{account.id}</Card.Title>
            <Card.Text>
              <p>Amount: {account.amount}</p>
              <p>Status: {account.status}</p>
              <p>User ID: {account.userId}</p>
            </Card.Text>
          </Card.Body>
          <Button variant="primary" onClick={() => handleToAccount(account.id)} className="mt-3">Перейти к счёту</Button>
        </Card>
      </Col>
      ))}
      </Row>
      </Container>
      
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Создать новый счет</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBankAccount}>
            <Form.Group controlId="accountType">
              <Form.Label>Select Account:</Form.Label>
              <Form.Control as="select" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                <option value="">Select...</option>
                {bankAccountTypes.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.id} - {account.Type} - {account.Conditions}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Создать счет</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {message && <div>{message}</div>}
      {error && <div>Error: {error}</div>}

    </Container>
  );
}

export default BankAccounts;

