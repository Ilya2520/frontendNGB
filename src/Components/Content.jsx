import React from 'react';
import Image from 'react-bootstrap/Image'
import { Card, Row, Container, Button, Col } from 'react-bootstrap';


function Content() {
  return (
    <Container>
      <section className="values-section mt-4">
        <h2>Ценности компании</h2>
        <Card>
          <Card.Body>
            <Card.Title>NexGenBank (NGB): Ваш успех - наша цель</Card.Title>
            <Card.Text>
              Мы стремимся к качеству, инновациям и обслуживанию наших клиентов. Наши ценности - это основа нашей работы.
            </Card.Text>
            <Card.Text className="text-muted">5 мая 2024 г.</Card.Text>
          </Card.Body>
        </Card>
      </section>


      <h1 className="mt-4">Новости NexGenBank (NGB)</h1>

      <section className="news-section mt-4">
        <h2>Статьи</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Открытие нового филиала</Card.Title>
                <Card.Text>
                  NexGenBank (NGB) открыл новый филиал в центре города. Новый филиал обеспечит удобный доступ к банковским услугам для жителей.
                </Card.Text>
                <Card.Text className="text-muted">10 мая 2024 г.</Card.Text>
                <Button variant="primary">Подробнее</Button>
              </Card.Body>
              <Card.Footer>
                Автор: Иван Иванов
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Рост выручки</Card.Title>
                <Card.Text>
                  NexGenBank (NGB) рад сообщить о росте выручки на прошлый квартал. Этот успех стал возможным благодаря нашим клиентам и сотрудникам.
                </Card.Text>
                <Card.Text className="text-muted">15 мая 2024 г.</Card.Text>
                <Button variant="primary">Подробнее</Button>
              </Card.Body>
              <Card.Footer>
                Автор: Мария Петрова
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Открыты новые вакансии</Card.Title>
                <Card.Text>
                  NexGenBank (NGB) приглашает талантливых профессионалов присоединиться к нашей команде. Подробности о вакансиях доступны на нашем сайте.
                </Card.Text>
                <Card.Text className="text-muted">20 мая 2024 г.</Card.Text>
                <Button variant="primary">Подробнее</Button>
              </Card.Body>
              <Card.Footer>
                Автор: Александр Сидоров
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="owner-section mt-4">
        <h2>Статья о владельце</h2>
        <Card>
          <Card.Body>
            <Card.Title>Генри Смит: История успеха</Card.Title>
            <Card.Text>
              Генри Смит, основатель NexGenBank (NGB), рассказывает о своем пути к успеху и ценностях, которые лежат в основе компании.
            </Card.Text>
            <Card.Text className="text-muted">25 мая 2024 г.</Card.Text>
            <Button variant="primary">Подробнее</Button>
          </Card.Body>
          <Card.Footer>
            Автор: Елена Иванова
          </Card.Footer>
        </Card>
      </section>

      <section className="achievements-section mt-4">
        <h2>Успехи и навыки</h2>
        <Card>
          <Card.Body>
            <Card.Title>Успехи и навыки: Как развиться в банковской сфере</Card.Title>
            <Card.Text>
              NexGenBank (NGB) предлагает уникальные возможности для развития навыков и достижения успеха в карьере в сфере финансов.
            </Card.Text>
            <Card.Text className="text-muted">30 мая 2024 г.</Card.Text>
            <Button variant="primary">Подробнее</Button>
          </Card.Body>
          <Card.Footer>
            Автор: Петр Сидоров
          </Card.Footer>
        </Card>
      </section>
    </Container>
  );
}

export default Content;