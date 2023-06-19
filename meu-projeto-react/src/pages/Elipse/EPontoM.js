import React, { useState, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import {handleButtonClick} from '../../components/CanvaDrawing2D';
import axios from 'axios';

function EPontoM() {

    const porta = '9090';
    const rota = 'elipse/ponto-medio';

    let hasTransformed = false;

    const [formData, setFormData] = useState({
      centerPos: '',
      minorRadioSize: '',
    });
    const canvasRef = useRef(null);

    const fetchData = () => {
      //req should be -> [{"ElipseCenter": "centerPos", "MinorRadius": "minorRadioSize"}]
      const arrayData = [
        {ElipseCenter: parseInt(formData.centerPos), MinorRadius: parseInt(formData.minorRadioSize) },
      ];
      axios
        .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
        .then(response => {
          handleButtonClick(canvasRef, response.data, hasTransformed);
          hasTransformed = true;
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleChange = e => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = e => {
      e.preventDefault();
      fetchData();
    };

    return (
      <div>
        <Menu />
        <h1>Elipse Ponto Medio</h1>

        <form onSubmit={handleSubmit} className="input-card">
          <h2>Ponto X e Y</h2>
          <div className="input-row">
              <div className="input-group">
                  <label>Valor CenterPosition:</label>
                  <input type="number" name="centerPos" value={formData.centerPos} onChange={handleChange} />
              </div>
              <div className="input-group">
                  <label>Valor Minor Radio Size:</label>
                  <input type="number" name="minorRadioSize" value={formData.minorRadioSize} onChange={handleChange} />
              </div>
          </div>
          <div className="button-container">
                  <button type="submit">Desenhar</button>
              </div>
        </form>

        <div className="canvas-container">
          <canvas ref={canvasRef} width={500} height={500} />
        </div>
      </div>
    );
}

export default EPontoM;
