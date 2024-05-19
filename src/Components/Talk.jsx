import React, { useState, useEffect } from 'react';
import instance from '../Services/axiosInstance'; // используем axios instance для запросов
import { API_ENDPOINTS } from '../constants';
import {Link} from "react-router-dom";
import {Container, Card, Button } from 'react-bootstrap';

function Talk() {
  const [dialogs, setDialogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDialogs();
  }, []);

  const fetchDialogs = async () => {
    try {
      const res = await instance.get(API_ENDPOINTS.TALKS);

      if (!res.data) {
        throw new Error(`No data received`);
      }

      setDialogs(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleCreateTalk = async () => {
    try {
      // Отправляем POST-запрос для создания новой беседы
      const res = await instance.post(API_ENDPOINTS.TALK_CREATE);
      console.log(res.data); 

      fetchDialogs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <div>
        <h2 className="mt-4">Обращения</h2>
        <Button variant="primary" onClick={handleCreateTalk}>Создать новое обращение</Button>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
          {dialogs.map(dialog => (
            <div key={dialog.id} className="col">
              <Card>
                <Card.Body>
                  <Card.Title>Обращение №{dialog.id}</Card.Title>
                  <Card.Text>
                    <p>User Email: {dialog.user_email}</p>
                    <p>At Work: {dialog.at_work ? 'Yes' : 'No'}</p>
                    <p>Is Solved: {dialog.is_solved ? 'Yes' : 'No'}</p>
                  </Card.Text>
                  <Link to={`/talks/${dialog.id}`}>
                    <Button variant="info" className="me-2">Подробнее</Button>
                  </Link>

                  <Button variant="danger" className="me-2">Удалить</Button>
                  <Button variant="secondary">Изменить</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Created {dialog.created_at}</small>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
        {error && <div>Error: {error}</div>}
      </div>
    </Container>
  );
}

export default Talk;