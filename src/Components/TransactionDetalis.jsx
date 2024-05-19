import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import instance from '../Services/axiosInstance'; // используем axios instance для запросов
import { API_ENDPOINTS } from '../constants';
import './styles/modal.css';
import { Card,Spinner,Container, Button} from 'react-bootstrap';

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransaction();
  }, []);
  const handleBack = () =>{
    window.location.href='/transactions';
  }

  const fetchTransaction = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.TRANSACTIONS + `/${id}`);
      setTransaction(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-4" style={{ minHeight: '50vh' }}>
      {transaction ? (<Card key={transaction.id} style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>Транзакция №{transaction.id}</Card.Title>
          <Card.Text>
          <p>ID: {transaction.id}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Status: {transaction.status}</p>
          <p>Transaction Type: {transaction.transactionType}</p>
          <p>Message: {transaction.message}</p>
          <p>From Bank Account ID: {transaction.fromBankAccount}</p>
          <p>To Bank Account ID: {transaction.toBankAccount}</p>
           </Card.Text>
           
        <Button variant="primary" onClick={handleBack} className="mt-3">Назад</Button>
        </Card.Body>
      </Card>
      ): (
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      )}
      {error && <div>Error: {error}</div>}
      </Container>
  );
};

export default TransactionDetails;
