import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function CPontoM() {
  const porta = '9090';
  const rota = 'circulo/ponto-medio';

  const [formData, setFormData] = useState({
    raio: '50',
    valuex: '0',
    valuey: '0',
    canvasWidth: '500', // Adiciona campo para largura do canvas
    canvasHeight: '500', // Adiciona campo para altura do canvas
  });
  const [data, setData] = useState([]);
  const canvasRef = useRef(null);

  const fetchData = () => {
    const arrayData = [
      {
        raio: parseInt(formData.raio),
        xOrigem: parseInt(formData.valuex),
        yOrigem: parseInt(formData.valuey),
      },
    ];
    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([]); // Limpar o círculo anterior
    fetchData();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Função para desenhar o pixel no canvas
    const drawPixel = (x, y) => {
        // Defina a cor do preenchimento
        context.fillStyle = 'red'; // Altere 'red' para a cor desejada

        // Ajuste o tamanho do pixel
        const pixelSize = 1; // Ajuste o tamanho conforme necessário

        // Calcule as coordenadas do centro
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Ajuste as coordenadas do pixel em relação ao centro
        const adjustedX = centerX + x;
        const adjustedY = centerY - y;

        // Desenhe o pixel no canvas
        context.fillRect(adjustedX, adjustedY, pixelSize, pixelSize);
    };

    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar os pontos do array
    data.forEach(point => {
        drawPixel(point.pontox, point.pontoy);
    });

}, [data]);


  return (
    <div className='container'>
      <Menu />
      <h1>Círculo Ponto Médio</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Ponto X e Y</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor X:</label>
            <input type="number" name="valuex" value={formData.valuex} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Y:</label>
            <input type="number" name="valuey" value={formData.valuey} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Raio:</label>
            <input type="number" name="raio" value={formData.raio} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Largura do Canvas:</label>
            <input type="number" name="canvasWidth" value={formData.canvasWidth} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Altura do Canvas:</label>
            <input type="number" name="canvasHeight" value={formData.canvasHeight} onChange={handleChange} />
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Desenhar</button>
        </div>
      </form>

      <div className="canvas-section">

        <div className="canvas-container">
          <canvas ref={canvasRef} width={formData.canvasWidth * 2} height={formData.canvasHeight * 2} />
        </div>
      </div>

      <h2>Pontos da Reta:</h2>
      <div className='data'>
        <table className="points-table">
          <thead>
            <tr>
              <th></th>
              <th>PontoX</th>
              <th>PontoY</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{point.pontox}</td>
                <td>{point.pontoy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CPontoM;
