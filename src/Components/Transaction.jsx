import React, { useState, useEffect } from 'react';
import instance from '../Services/axiosInstance'; // используем axios instance для запросов
import { API_ENDPOINTS } from '../constants';
import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import { Row, Col, Container, Button } from 'react-bootstrap';

function Transaction() {
  const [transactions, setTransaction] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDialogs();
  }, []);

  const fetchDialogs = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.TRANSACTIONS);

      console.log(res.data);
      if (!res.data) {
        throw new Error(`No data received`);
      }
      setTransaction(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleToTransaction = (id) => {
    window.location.href = `/transactions/${id}`;
  }
  return (
    <Container fluid>
      <h2 className="mt-4">Ваши транзакции:</h2> {/* Добавлен отступ сверху */}
    <Row xs={1} md={4} className="g-4">
      { transactions.map(transaction => (
      <Col key={transaction.id}>
      <Card key={transaction.id} style={{ width: '18rem' }}>
        {/* <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link> */}

        <Card.Body>
          <Card.Title>Номер транзакции №{transaction.id}</Card.Title>
          <Card.Text>
            <p>Amount: {transaction.amount}
            </p>
            <p> Status: {transaction.status}
            </p>
           </Card.Text>
        </Card.Body>
        <Button variant="primary" onClick={() => handleToTransaction(transaction.id)} className="mt-3">Перейти к транзакции</Button>
      </Card>
      </Col>
      ))}
    </Row>
    </Container>
  );
  
}

export default Transaction;