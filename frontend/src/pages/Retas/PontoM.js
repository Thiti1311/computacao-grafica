import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function PontoM() {
  const porta = '9090';
  const rota = 'reta/ponto-medio';

  const [formData, setFormData] = useState({
    valuex1: '60',
    valuey1: '90',
    valuex2: '90',
    valuey2: '140',
    canvasWidth: '500', // Valor padrão para largura do canvas
    canvasHeight: '500' // Valor padrão para altura do canvas
  });
  const [lines, setLines] = useState([]);

  const fetchData = () => {
    const arrayData = [
      {
        pontox: parseInt(formData.valuex1),
        pontoy: parseInt(formData.valuey1)
      },
      {
        pontox: parseInt(formData.valuex2),
        pontoy: parseInt(formData.valuey2)
      }
    ];

    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then(response => {
        setLines(response.data);
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
    setLines([]); // Limpar as retas anteriores
    fetchData();

    // Definir o tamanho do canvas com base nos valores do formulário
    const canvas = canvasRef.current;
    canvas.width = parseInt(formData.canvasWidth);
    canvas.height = parseInt(formData.canvasHeight);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Definir as dimensões do canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Definir o centro do canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Função para desenhar pontos no canvas
    const drawPoints = (points) => {
      // Limpar o canvas
      // context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Definir a cor e o tamanho dos pontos
      context.fillStyle = 'red'; // Altere 'red' para a cor desejada
      const pixelSize = 2; // Ajuste o tamanho do ponto conforme necessário

      // Desenhar cada ponto
      points.forEach(point => {
        // Ajustar as coordenadas em relação ao centro do canvas
        const adjustedX = centerX + point.pontox;
        const adjustedY = centerY - point.pontoy;
        // Desenhar o ponto ajustado
        context.fillRect(adjustedX, adjustedY, pixelSize, pixelSize);
      });
    };

    // Função para desenhar o pixel 0,0
    const drawPixel = () => {
      // Defina a cor do preenchimento
      context.fillStyle = 'white'; // Altere 'white' para a cor desejada

      // Ajuste o tamanho do pixel
      const pixelSize = 5; // Ajuste o tamanho conforme necessário

      // Desenhe o pixel no centro do canvas
      context.fillRect(centerX, centerY, pixelSize, pixelSize);
    };

    // Chamar a função para desenhar o pixel 0,0
    drawPixel();

    // Verificar se há pontos para desenhar
    if (lines.length > 0) {
      drawPoints(lines);
    }
  }, [lines]);

  return (
    <div className="container">
      <Menu />
      <h1>Reta Ponto Médio</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Ponto 1</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x1:</label>
            <input type="number" name="valuex1" value={formData.valuex1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor y1:</label>
            <input type="number" name="valuey1" value={formData.valuey1} onChange={handleChange} />
          </div>
        </div>

        <h2>Ponto 2</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor x2:</label>
            <input type="number" name="valuex2" value={formData.valuex2} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor y2:</label>
            <input type="number" name="valuey2" value={formData.valuey2} onChange={handleChange} />
          </div>
        </div>

        <h2>Tamanho do Canvas</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Largura:</label>
            <input type="number" name="canvasWidth" value={formData.canvasWidth} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Altura:</label>
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
            {lines.map((point, index) => (
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

export default PontoM;
