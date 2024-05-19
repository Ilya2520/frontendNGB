import React from 'react';
import { Container } from 'react-bootstrap';
import { FaInstagram, FaYoutube, FaTelegram, FaVk } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer mt-auto py-3" style={{ backgroundColor: '#095776', color: 'white' }}>
      <Container>
        <Container className="text-center mb-3 me-3">
          <a href="https://www.instagram.com/cvmpori" className="text-white"><FaInstagram size={40} /></a>
          <a href="https://www.youtube.com/wliestd" className="ms-3 text-white"><FaYoutube size={40} /></a>
          <a href="https://t.me/liewstd" className="ms-3 text-white"><FaTelegram size={40} /></a>
          <a href="https://vk.com/ilyshenka7" className="ms-3 text-white"><FaVk size={40} /></a>
        </Container>
        <p className="text-center mb-0">Создано при поддержке РТУ МИРЭА</p>
        <p className="text-center mb-0">Емельянов Илья</p>
        <p className="text-center mb-0">г. Москва 2024</p>
      </Container>
    </footer>
  );
}

export default Footer;
