import React from 'react';
import Botao from '../components/Botao';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Página Home</h1>
      <Botao />
    </div>
  );
}

export default Home;