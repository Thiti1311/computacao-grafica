import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function CPontoM() {
  
  const porta = '9090';
  const rota = 'circulo/trigonometria';

  const [formData, setFormData] = useState({
    raio: '',
    valuex: '',
    valuey: '',
  });

  const [pointsData, setPointsData] = useState([]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(context, pointsData);
  }, [pointsData]);

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
      .then(response => {
        setPointsData(response.data);
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

  const drawPoints = (context, points) => {
    context.beginPath();
  
    if (points.length > 0) {
      const offsetX = canvasRef.current.width / 2; // Offset to center horizontally
      const offsetY = canvasRef.current.height / 2; // Offset to center vertically
  
      context.moveTo(points[0].pontox + offsetX, -points[0].pontoy + offsetY);
  
      for (let i = 1; i < points.length; i++) {
        const { pontox, pontoy } = points[i];
        context.lineTo(pontox + offsetX, -pontoy + offsetY);
      }
    }
  
    context.strokeStyle = '#000000';
    context.fillStyle = 'transparent';
    context.stroke();
  };

  return (
    <div>
      <Menu />
      <h1>Círculo Explicita</h1>

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

export default CPontoM;
