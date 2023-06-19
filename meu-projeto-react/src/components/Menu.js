import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="menu">
      <ul>
        <li className={currentPage === 'home' ? 'active' : ''}>
          <Link to="/" onClick={() => handlePageChange('home')}>
            Home
          </Link>
        </li>
        <li className={currentPage === 'sobre' ? 'active' : ''}>
          <Link to="/sobre" onClick={() => handlePageChange('sobre')}>
            Alunos
          </Link>
        </li>
        <li className={currentPage === 'dda' ? 'active' : ''}>
          <Link to="/retas/dda" onClick={() => handlePageChange('dda')}>
            DDA
          </Link>
        </li>
        <li className={currentPage === '/retas/pontom' ? 'active' : ''}>
          <Link to="/retas/pontom" onClick={() => handlePageChange('/retas/pontom')}>
            Ponto Médio
          </Link>
        </li>
        <li className={currentPage === '/circulos/explicita' ? 'active' : ''}>
          <Link to="/circulos/explicita" onClick={() => handlePageChange('/circulos/explicita')}>
            Circulo Explicita
          </Link>
        </li>
        <li className={currentPage === '/circulos/trigonometrica' ? 'active' : ''}>
          <Link to="/circulos/trigonometrica" onClick={() => handlePageChange('/circulos/trigonometrica')}>
            Circulo Trigonometrico
          </Link>
        </li>
        <li className={currentPage === '/circulos/cpontom' ? 'active' : ''}>
          <Link to="/circulos/cpontom" onClick={() => handlePageChange('/circulos/cpontom')}>
            Circulo Ponto Médio
          </Link>
        </li>
        <li className={currentPage === '/elipses/epontom' ? 'active' : ''}>
          <Link to="/elipses/epontom" onClick={() => handlePageChange('/elipses/epontom')}>
            Elipse Ponto Médio
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
