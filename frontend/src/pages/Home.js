import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className='text'>
        <h1>Bem-vindo Projeto</h1>
        <h3>Desenvolvido por:</h3>
        <h3>Thiago Felipe</h3>
        <Link to="/MenuStart" className="btn">
          Ir para a Apresentação
        </Link>
      </div>
    </div>
  );
}

export default Home;
