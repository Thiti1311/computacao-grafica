import React from 'react';
import Botao from '../components/Botao';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Nosso Projeto</h1>
      <h3>Desenvolvido por: Thiago Felipe</h3>
      <Botao />
    </div>
  );
}

export default Home;
