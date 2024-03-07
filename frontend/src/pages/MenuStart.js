import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuStart.css';

const MenuStart = () => {
  return (
    <div className="home-page">
      <div className="button-container">
      <Link className="custom-button" to={'/ndc/ndc'}>NDC</Link>
        {/* <button className="custom-button">Botão 2</button>
        <button className="custom-button">Botão 3</button>
        <button className="custom-button">Botão 4</button>
        <button className="custom-button">Botão 5</button>
        <button className="custom-button">Botão 6</button>
        <button className="custom-button">Botão 7</button>
        <button className="custom-button">Botão 8</button>
        <button className="custom-button">Botão 9</button>
        <button className="custom-button">Botão 10</button> */}
      </div>
    </div>
  );
}


export default MenuStart;
