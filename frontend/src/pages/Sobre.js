import React from 'react';
import imagem1 from '../imgs/thiago.png';
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
      </div>
    </div>
  );
}

export default Sobre;
