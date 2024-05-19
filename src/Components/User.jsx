import React, { useState, useEffect } from 'react';
import instance  from '../Services/axiosInstance';
import { Card, Spinner, Container, Button } from 'react-bootstrap';


const User = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await instance.get(`/me`);
      setUser(res.data);
      console.log(res);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const handleDelete = async () => {
    //
  };

  const handleEdit = () => {
    // Здесь можно добавить логику для редактирования банковского аккаунта
    // Например, можно открыть форму редактирования или перейти на другую страницу
  };
return (
  <Container className="d-flex flex-column align-items-center mt-4">
      {user ? (
        <Card style={{ width: '24rem' }}>

          <Card.Img src="holder.js/100px270" />
          <Card.Body>
            <Card.Title>Профиль пользователя:</Card.Title>
            <Card.Text>
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>Last Name: {user.last_name}</p>
              <p>Phone: {user.phone}</p>
              <p>Active: {user.isActive}</p>
              <p>Roles: {user.roles}</p>
              <p>Settings: {user.settings}</p>
            </Card.Text>
            <div className="d-flex">
              <Button variant="success" onClick={handleEdit} style={{ marginRight: '10px' }} className="mt-3">Изменить</Button>
              <Button variant="danger" onClick={handleDelete} className="mt-3">Удалить</Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {error && <div className="text-danger mt-3">Error: {error}</div>}
    </Container>
  );
};

export default User;