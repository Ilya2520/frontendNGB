import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function Header({ onLogout, userRole }) {
  return (
    <header>
      <Navbar bg="#095776" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="NGB logo" className="ngb-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/me">Личный кабинет</Nav.Link>
            <Nav.Link as={Link} to="/talks">Обращения</Nav.Link>
            <Nav.Link as={Link} to="/bank_accounts">Счета</Nav.Link>
            <Nav.Link as={Link} to="/transactions">Переводы</Nav.Link>
            {userRole === 'ROLE_ADMIN' && <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>}
          </Nav>
          <Button variant="secondary" onClick={onLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ paddingTop: '105px' }}></div>
    </header>
  );
}

export default Header;
