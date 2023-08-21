import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function Ndc() {

    const porta = '9090';
    const rota = 'ndc';

    const [formData, setFormData] = useState({
        yMax: '', y: '', yMin: '',
        xMax: '', x: '', xMin: '',
    });
    const [data, setData] = useState([]);
    const canvasRef = useRef(null);

    const fetchData = () => {
      //req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
      const arrayData = [
        {   
            yMax: parseInt(formData.yMax), y: parseInt(formData.y), yMin: parseInt(formData.yMin),
            xMax: parseInt(formData.xMax), x: parseInt(formData.x), xMin: parseInt(formData.xMin)  
        },
      ];
      axios
        .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
        .then(response => {
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
    
    // Função para desenhar o circulo no canvas
    const drawCircle = () => {
      // Limpar o canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar o círculo
      data.forEach(([pontox, pontoy]) => {
        context.beginPath();
        context.arc(pontox, pontoy, 1, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
      });
    };
      // Chamar a função de desenho após a atualização do estado data
      drawCircle();
      // Chamar a função de desenho após a atualização do estado data
      drawCircle();
    }, [data]);

    return (
      <div>
        <Menu />
        <h1>Circulo Ponto Medio</h1>

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

export default Ndc;
