import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuStart.css';

const MenuStart = () => {
  return (
    <div className="home-page">
      <div className="button-container">
      <Link className="custom-button" to={'/ndc/ndc'}>NDC</Link>
      <Link className="custom-button" to={'/retas/dda'}>DDA</Link>
      <Link className="custom-button" to={'/retas/pontom'}>Ponto Médio</Link>
      </div>
    </div>
  );
}


export default MenuStart;
