import React, { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Import the CSS file for styling
import axios from 'axios';

function DDA() {
  const porta = '9090';
  const rota = 'reta/dda';

  const [formData, setFormData] = useState({
    valuex1: '',
    valuey1: '',
    valuex2: '',
    valuey2: ''
  });

  const [pointsData, setPointsData] = useState([]);

  const canvasRef = useRef(null);

  useEffect(() => {
    drawLine();
  }, [pointsData]);

  const fetchData = () => {
    const arrayData = [
      { pontox: parseInt(formData.valuex1), pontoy: parseInt(formData.valuey1) },
      { pontox: parseInt(formData.valuex2), pontoy: parseInt(formData.valuey2) }
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

  const drawLine = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (pointsData.length > 0) {
      const offsetX = canvas.width / 2; // Offset to center horizontally
      const offsetY = canvas.height / 2; // Offset to center vertically
      
      context.beginPath();
      context.moveTo(pointsData[0].pontox + offsetX, -pointsData[0].pontoy + offsetY);
      
      for (let i = 1; i < pointsData.length; i++) {
        const { pontox, pontoy } = pointsData[i];
        context.lineTo(pontox + offsetX, -pontoy + offsetY);
      }
      
      context.stroke();
    }
  };

  return (
    <div>
      <Menu />
      <h1>Reta DDA</h1>
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

export default DDA;