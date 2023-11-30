import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/Menu';
import Sketch from 'react-p5';

const canvasHeight = 700;
const canvasWidth = 700;

const Transformacao3D = () => {
  const porta = '9090';
  const rota = 'recorte/transformacao-3d';

  const [transformacoes, setTransformacoes] = useState([
    { tipo_transformacao: '', params: {} }
  ]);

  const [pontosOriginais, setPontosOriginais] = useState([
    { pontox: 0, pontoy: 0 , pontoz: 0}
  ]);

  const [pontosTransformados, setPontosTransformados] = useState([]);

  const handlePontosOriginaisChange = (index, field, value) => {
    const updatedPontosOriginais = [...pontosOriginais];
    updatedPontosOriginais[index] = {
      ...updatedPontosOriginais[index],
      [field]: value,
    };
    setPontosOriginais(updatedPontosOriginais);
  };

  const enviarTransformacoesParaBackend = async () => {
    try {
      // Prepare data to send to the backend
      const data = {
        transformacoes,
        pontosOriginais,
      };

      // Make a POST request to the backend
      const response = await axios.post(`http://localhost:${porta}/${rota}`, data);
      setPontosTransformados(response.data);
      // Handle the response from the backend if needed
      console.log('Backend response:', pontosTransformados);
    } catch (error) {
      // Handle errors
      console.error('Error sending data to the backend:', error.message);
    }
  };

  const handleTransformacaoChange = (index, field, value) => {
    const updatedTransformacoes = [...transformacoes];
    updatedTransformacoes[index] = {
      ...updatedTransformacoes[index],
      [field]: value,
    };
    setTransformacoes(updatedTransformacoes);
  };

  const adicionarTransformacao = () => {
    setTransformacoes([...transformacoes, { tipo_transformacao: '', params: {} }]);
  };

  const adicionarPontoOriginal = () => {
    setPontosOriginais([...pontosOriginais, { pontox: 0, pontoy: 0 }]);
  };

  const renderCamposParams = (index) => {
    const { tipo_transformacao, params } = transformacoes[index];

    if (tipo_transformacao === 'translacao') {
      return (
        <>
          <label htmlFor="transX">Translação X:</label>
          <input
            type="number"
            id="transX"
            value={params.transX || ''}
            onChange={(e) => handleParamsChange(index, 'transX', parseFloat(e.target.value))}
          />
          <label htmlFor="transY">Translação Y:</label>
          <input
            type="number"
            id="transY"
            value={params.transY || ''}
            onChange={(e) => handleParamsChange(index, 'transY', parseFloat(e.target.value))}
          />
          <label htmlFor="transZ">Translação Z:</label>
          <input
            type="number"
            id="transZ"
            value={params.transZ || ''}
            onChange={(e) => handleParamsChange(index, 'transZ', parseFloat(e.target.value))}
          />
        </>
      );
    } else if (tipo_transformacao === 'rotacao') {
      return (
        <>
          <label htmlFor="angulo">Ângulo:</label>
          <input
            type="number"
            id="angulo"
            value={params.angulo || ''}
            onChange={(e) => handleParamsChange(index, 'angulo', parseFloat(e.target.value))}
          />
          <label htmlFor="eixo">Eixo:</label>
          <select
            value={params.eixo || ''}
            onChange={(e) => handleParamsChange(index, 'eixo', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="z">Z</option>
          </select>
        </>
      );
    }
    else if (tipo_transformacao === 'escala') {
      return (
        <>
          <label>Escala em X:</label>
          <input
            type="number"
            id="escalaX"
            value={params.escalaX || ''}
            onChange={(e) => handleParamsChange(index, 'escalaX', parseFloat(e.target.value))}
          />
          <label htmlFor="eixo">Escala em Y:</label>
          <input
            type="number"
            id="escalaY"
            value={params.escalaY || ''}
            onChange={(e) => handleParamsChange(index, 'escalaY', e.target.value)}
          />
        </>
      );
    }
    else if (tipo_transformacao === 'cisalhamento') { // { fatorCisalhamento1: 0.5, fatorCisalhamento2: 0, direcao: 'x' }
      return (
        <>
          <label>Fator de Cisalhamento:</label>
          <input
            type="number"
            id="fatorCisalhamento1"
            value={params.fatorCisalhamento1 || ''}
            onChange={(e) => handleParamsChange(index, 'fatorCisalhamento', parseFloat(e.target.value))}
          />
          <label>Direção:</label>
          <select
            value={params.direcao || ''}
            onChange={(e) => handleParamsChange(index, 'direcao', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
          </select>
        </>
      );
    }
    else if (tipo_transformacao === 'reflexao') {
      return (
        <>
          <label>M da Reta:</label>
          <input
            type="number"
            id="mReta"
            value={params.mReta || ''}
            onChange={(e) => handleParamsChange(index, 'mReta', parseFloat(e.target.value))}
          />
          <label>N da Reta:</label>
          <input
            type="number"
            id="nReta"
            value={params.nReta || ''}
            onChange={(e) => handleParamsChange(index, 'nReta', parseFloat(e.target.value))}
          />
          <select
            value={params.eixo || ''}
            onChange={(e) => handleParamsChange(index, 'eixo', e.target.value)}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="reta">Reta</option>
          </select>
        </>
      );
    }

    return null; // Se o tipo de transformação não for reconhecido
  };

  const handleParamsChange = (index, campo, valor) => {
    const updatedTransformacoes = [...transformacoes];
    updatedTransformacoes[index] = {
      ...updatedTransformacoes[index],
      params: {
        ...updatedTransformacoes[index].params,
        [campo]: valor,
      },
    };
    setTransformacoes(updatedTransformacoes);
  };

  const desenharFiguraInicial = (p5) => {
    // Draw lines between consecutive original points
    for (let i = 0; i < pontosOriginais.length - 1; i++) {
      const pontoAtual = pontosOriginais[i];
      const proximoPonto = pontosOriginais[i + 1];
      p5.line(
        pontoAtual.pontox, -pontoAtual.pontoy, pontoAtual.pontoz,
        proximoPonto.pontox, -proximoPonto.pontoy, proximoPonto.pontoz
      );
    }

    // Draw a line connecting the last and first original points to close the shape if there are at least two points
    if (pontosOriginais.length >= 2) {
      const primeiroPonto = pontosOriginais[0];
      const ultimoPonto = pontosOriginais[pontosOriginais.length - 1];
      p5.line(
        ultimoPonto.pontox, -ultimoPonto.pontoy, ultimoPonto.pontoz,
        primeiroPonto.pontox, -primeiroPonto.pontoy, primeiroPonto.pontoz
      );
    }
  };

  const desenharPontosTransformados = (p5, pontosTransformados) => {
    p5.stroke(255, 0, 255); // Cor das linhas
    p5.strokeWeight(2); // Espessura da linha

    // Desenha linhas conectando pontos consecutivos
    for (let i = 0; i < pontosTransformados.length; i++) {
      const pontoAtual = pontosTransformados[i][0];
      const proximoPonto = pontosTransformados[(i + 1) % pontosTransformados.length][0];
      p5.line(pontoAtual[0], -pontoAtual[1], pontoAtual[2], proximoPonto[0], -proximoPonto[1], proximoPonto[2]);
    }
  };

  // const setup = (p5, canvasParentRef) => {
  //   p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL).parent(canvasParentRef);
  // };

  // const draw = (p5) => {
  //   p5.background(0); // Limpa o canvas a cada frame
  //   p5.translate(0, 0, -200); // Translada para um local onde podemos ver os eixos
  //   p5.rotateX(p5.PI / 6); // Rotação inicial em X
  //   p5.rotateY(p5.PI / 4); // Rotação inicial em Y
  //   planoInicial(p5);
  //   desenharFiguraInicial(p5);
  
  //   if (pontosTransformados.length > 0) {
  //     desenharPontosTransformados(p5, pontosTransformados);
  //   }
  // };
  
  // const planoInicial = (p5) => {
  //   // Eixos cartesianos em 3D
  //   p5.strokeWeight(1);
  
  //   // Eixo X - vermelho
  //   p5.stroke(255, 0, 0);
  //   p5.line(0, 0, 0, 200, 0, 0); // x
  
  //   // Eixo Y - verde
  //   p5.stroke(0, 255, 0);
  //   p5.line(0, 0, 0, 0, -200, 0); // y
  
  //   // Eixo Z - azul
  //   p5.stroke(0, 0, 255);
  //   p5.line(0, 0, 0, 0, 0, 200); // z
  // };

  const setup = (p5) => {
    p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
  }
  
  const draw = (p5) =>  {
    p5.background(200);
    drawAxis(p5, canvasWidth / 2);
  }

  const drawAxis = (p5 ,length) => {
    // Eixo X (vermelho)
    p5.fill(255, 0, 0);
    p5.line(0, 0, 0, length, 0, 0);
    p5.push();
  
    // Eixo Y (verde)
    p5.fill(0, 255, 0);
    p5.line(0, 0, 0, 0, length, 0);
    p5.push();
  
    // Eixo Z (azul)
    p5.fill(0, 0, 255);
    p5.line(0, 0, 0, 0, 0, length);
    p5.push();
  }
  
  return (
    <>
      <Menu />
      <Sketch setup={setup} draw={draw} />
      <div>
        <h2>Transformações 3D</h2>
        {transformacoes.map((transformacao, index) => (
          <div key={index}>
            <label>Tipo de Transformação:</label>
            <select
              value={transformacao.tipo_transformacao}
              onChange={(e) => handleTransformacaoChange(index, 'tipo_transformacao', e.target.value)}
            >
            <option value="">Selecione...</option>
            <option value="translacao">Translação</option>
            <option value="rotacao">Rotação</option>
            <option value="escala">Escala</option>
            <option value="cisalhamento">Cisalhamento</option>
            <option value="reflexao">Reflexão</option>
          </select>
            <label>Parâmetros:</label>
            {renderCamposParams(index)}
          </div>
        ))}
        <button onClick={adicionarTransformacao}>Adicionar Transformação</button>
        <button onClick={adicionarPontoOriginal}>Adicionar Ponto Original</button>
        <button onClick={enviarTransformacoesParaBackend}>Enviar Transformações para o Backend</button>

        {pontosOriginais.map((ponto, index) => (
          <div key={index}>
            <label>Ponto {index + 1}:</label>
            <input
              type="number"
              value={ponto.pontox}
              onChange={(e) => handlePontosOriginaisChange(index, 'pontox', parseFloat(e.target.value))}
            />
            <input
              type="number"
              value={ponto.pontoy}
              onChange={(e) => handlePontosOriginaisChange(index, 'pontoy', parseFloat(e.target.value))}
            />
            <input
              type="number"
              value={ponto.pontoz}
              onChange={(e) => handlePontosOriginaisChange(index, 'pontoz', parseFloat(e.target.value))}
            />
          </div>
        ))}

        {pontosTransformados.length > 0 && (
          <div>
            <h2>Pontos Transformados</h2>
            <ul>
              {pontosTransformados.map((ponto, index) => (
                <li key={index}>{`(${ponto[0]}, ${ponto[1]}, ${ponto[2]})`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Transformacao3D;
