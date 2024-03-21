import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css';
import axios from 'axios';

function NDC() {

  const porta = '9090';
  const rota = 'ndc';

  const [formData, setFormData] = useState({
    yMax: '20.3', y: '12.2', yMin: '10.5',
    xMax: '20.3', x: '12.2', xMin: '10.5',
    min: '0', max: '1', canvasWidth: '1920', canvasHeight: '1080'
  });

  const [data, setData] = useState([]);

  const canvasRef = useRef(null);
  const fetchData = () => {
    const arrayData = [
      {
        yMax: parseFloat(formData.yMax), y: parseFloat(formData.y), yMin: parseFloat(formData.yMin),
        xMax: parseFloat(formData.xMax), x: parseFloat(formData.x), xMin: parseFloat(formData.xMin),
        min: parseInt(formData.min), max: parseInt(formData.max),
        w: parseInt(formData.canvasWidth), h: parseInt(formData.canvasHeight)
      },
    ];
    axios
      .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
      .then(response => {
        console.log(response.data);
        setData(response.data);
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
    setData([]); // Limpar as circulo anterior
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
        const pixelSize = 4; // Ajuste o tamanho conforme necessário

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

    drawPixel(0,0);

    // Verificar se há um único pixel para desenhar
    if (data.length === 1) {
        const { dcX, dcY } = data[0];
        drawPixel(dcX, dcY);
    }
}, [data]);

  return (
    <div className="container">
      <Menu />
      <h1 className='title'>NDC</h1>

      <form onSubmit={handleSubmit} className="input-card">
        <h2>Valores</h2>
        <div className="input-row">
          <div className="input-group">
            <label>Valor X:</label>
            <input type="number" name="x" value={formData.x} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor X Maximo:</label>
            <input type="number" name="xMax" value={formData.xMax} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor X Minimo:</label>
            <input type="number" name="xMin" value={formData.xMin} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Y:</label>
            <input type="number" name="y" value={formData.y} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Y Maximo:</label>
            <input type="number" name="yMax" value={formData.yMax} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Y Minimo:</label>
            <input type="number" name="yMin" value={formData.yMin} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Valor Mínimo:</label>
            <select name="min" value={formData.min} onChange={handleChange}>
              <option value="-1">-1</option>
              <option value="0">0</option>
            </select>
          </div>
          <div className="input-group">
            <label>Valor Máximo:</label>
            <select name="max" value={formData.max} onChange={handleChange}>
              <option value="1">1</option>
            </select>
          </div>
        </div>
        <div className="input-group">
          <label>Largura da tela:</label>
          <input type="number" name="canvasWidth" value={formData.canvasWidth} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Altura da tela:</label>
          <input type="number" name="canvasHeight" value={formData.canvasHeight} onChange={handleChange} />
        </div>
        <div className="button-container">
          <button type="submit">Ativar Pixel</button>
        </div>
      </form>

      <div className="canvas-section">
        <h2>Valores de DCX e DCY</h2>
        <div className="row-container">
          <div className="column-container">
            <p data-label="DCx:"> {data.length > 0 ? data[0].dcX : 'N/A'} </p>
            <p data-label="DCy:"> {data.length > 0 ? data[0].dcY : 'N/A'} </p>
          </div>
          <div className="column-container">
            <p data-label="NDCx:"> {data.length > 0 ? data[0].ndcX : 'N/A'} </p>
            <p data-label="NDCy:"> {data.length > 0 ? data[0].ndcY : 'N/A'} </p>
          </div>
        </div>

        <div className="canvas-container">
        <canvas ref={canvasRef} width={formData.canvasWidth} height={formData.canvasHeight} />

        </div>
      </div>

    </div>
  );
}

export default NDC;
