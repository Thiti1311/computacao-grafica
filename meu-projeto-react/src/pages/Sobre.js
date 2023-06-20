import React from 'react';
import imagem1 from '../imgs/thiago.png';
import imagem2 from '../imgs/marinho.png';
import imagem3 from '../imgs/welio.jpg';
import '../styles/Sobre.css';
import Menu from '../components/Menu';

const Sobre = () => {
  return (
    <div>
      <Menu />
      <div className="sobre-container">
        <div className="card">
          <img src={imagem1} alt="Perfil 1" />
          <div className="card-content">
            <h2>Thiago Felipe Viana Diniz</h2>
            <p>Aluno de Computação na UEPB no Sexto período. Atualmente estagiário de QA na Orbit Tech.</p>
          </div>
        </div>
        <div className="card">
          <img src={imagem2} alt="Perfil 2" />
          <div className="card-content">
            <h2>João Victor Marinho Souza</h2>
            <p>Aluno de Computação na UEPB no Sexto período. Atualmente estagiário de QA na Orbit Tech.</p>
          </div>
        </div>
        <div className="card">
          <img src={imagem3} alt="Perfil 3" />
          <div className="card-content">
            <h2>Francisco Welio</h2>
            <p>Aluno de Computação na UEPB no Sexto período. Atualmente estagiário de QA na Orbit Tech.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
