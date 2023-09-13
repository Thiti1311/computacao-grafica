import React, { useState, useEffect, useRef } from 'react';
import Menu from '../../components/Menu';
import '../../styles/Retas.css'; // Importe o arquivo CSS para estilização
import axios from 'axios';

function CPontoM() {

    const porta = '9090';
    const rota = 'circulo/ponto-medio';

    const [formData, setFormData] = useState({
      raio: '',
      valuex: '',
      valuey: ''
    });
    const [data, setData] = useState([]);
    const canvasRef = useRef(null);

    const fetchData = () => {
      //req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
      const arrayData = [
        {raio: parseInt(formData.raio), xOrigem: parseInt(formData.valuex), yOrigem: parseInt(formData.valuey) },
      ];
      axios
        .post(`http://localhost:${porta}/figura/${rota}`, arrayData)
        .then(response => {
          setData(response.data);
          console.log(response.data);

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
      
        // Loop through the data array and draw each circle
        data.forEach(point => {
          context.beginPath();
          context.arc(point.pontox, point.pontoy, 1, 0, 2 * Math.PI);
          context.fill();
          context.closePath();
        });
      };
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

export default CPontoM;
