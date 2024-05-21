import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Modal, Spinner } from 'react-bootstrap';
import instance from '../Services/axiosInstance';
import { API_ENDPOINTS } from '../constants';
import './styles/modal.css';
import { FaArrowUp } from 'react-icons/fa';

const TalkHistory = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [talk, setTalk] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const userId = '2'; // Пример значения для user id из куков

  useEffect(() => {
    fetchTalkHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const fetchTalkHistory = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.TALKS + `/${id}`);
      setTalk(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateTalk = async (event) => {
    event.preventDefault();
    const data = { text };
    try {
      const res = await instance.post(`${API_ENDPOINTS.TALK_CREATE}/${id}/message`, data);
      fetchTalkHistory();
      setShowForm(false);
      setText('');
    } catch (err) {
      setError(err.message);
    }
  };
  const handleBack = () =>{
    window.location.href='/talks';
  }

  return (
    <Container fluid>
      <Button variant="secondary" onClick={handleBack} className="mt-3 me-2">Назад</Button>
      <div className="d-flex flex-column align-items-center mt-1">
      <Card style={{ width: '100%', marginTop: '2rem', backgroundColor: '#f8f9fa', border: '2px solid #343a40' }}>
  <Card.Body style={{ color: '#343a40' }}>
    {talk ? (
      <>
        <Card.Title style={{ color: '#007bff' }}>{talk.id}</Card.Title>
        <Card.Text>
          <p>User Email: {talk.user_email}</p>
          <p>Updated At: {talk.updated_at}</p>
          <p>Closed At: {talk.closed_at}</p>
          <p>Created At: {talk.created_at}</p>
          <p>Status: {talk.status}</p>
          <p>At Work: {talk.at_work ? 'Yes' : 'No'}</p>
          <p>Is Solved: {talk.is_solved ? 'Yes' : 'No'}</p>
          <p>Taked By Email: {talk.taked_by_email}</p>
        </Card.Text>
      </>
    ) : (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )}
  </Card.Body>
</Card>
      </div>

      
      <div className="d-flex flex-column align-items-start mt-4 ms-4 me-4">
  <h4>Сообщения</h4>
  {talk && talk.messages && talk.messages.length > 0 ? (
    talk.messages.map((message) => (
      <Card
        key={message.id}
        style={{
          width: '80%',
          marginTop: '2rem',
          backgroundColor: message.from === userId ? '#30b2e6' : 'inherit',
          color: message.from === userId ? 'white' : 'inherit',
          alignSelf: message.from === userId ? 'flex-end' : 'flex-start',
          borderRadius: '35px', // добавлено закругление углов
          marginBottom: '10px', // добавлен отступ между сообщениями
          padding: '10px', // добавлен отступ внутри карточки
          }}
      >
        <Card.Body>
          <Card.Title>{message.fromS}</Card.Title>
          <Card.Text style={{ fontSize: '24px' }}>
            {message.text}
          </Card.Text>
          <Card.Footer className=""><p>{formatDate(message.sendAt)}</p></Card.Footer>
        </Card.Body>
      </Card>
    ))
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )}
    </div>

    <Container fluid className="d-flex justify-content-end mb-2">
  <Form onSubmit={handleCreateTalk} style={{ maxWidth: '80%', width: '100%' }}>
    <Form.Group controlId="message">
      <Form.Label>Text:</Form.Label>
      <div className="d-flex">
      <Form.Control as="textarea" rows={4} value={text} onChange={(e) => setText(e.target.value)} style={{ minHeight: '200px', border: '1px solid black', padding: '20px' }} />
      <Button variant="primary" type="submit" disabled={!text.trim()} className="d-inline-flex align-items-center justify-content-center mt-2" style={{ marginLeft: '-40px', borderRadius: '50%', width: '40px', height: '40px' }}>
          <FaArrowUp size={20}/>
        </Button>
      </div>
    </Form.Group>
  </Form>
</Container>


      
{/* 
      <Button variant="primary" onClick={() => setShowForm(true)}>Отправить сообщение</Button>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Отправить сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTalk}>
            <Form.Group controlId="message">
              <Form.Label>Text:</Form.Label>
              <Form.Control type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
            <Button variant="primary" type="submit">Отправить</Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
};

export default TalkHistory;
