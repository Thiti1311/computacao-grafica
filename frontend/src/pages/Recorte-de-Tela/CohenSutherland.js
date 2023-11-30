import React, { useState } from "react";
import Sketch from "react-p5";
import Menu from './../../components/Menu';

const canvasHeight = 700;
const canvasWidth = 700;

export default (props) => {
  const [xA, setXA] = useState(10);
  const [yA, setYA] = useState(10);
  const [xB, setXB] = useState(200);
  const [yB, setYB] = useState(200);
  const [xTela, setXTela] = useState(30);
  const [yTela, setYTela] = useState(30);
  const [largura, setLargura] = useState(30);
  const [altura, setAltura] = useState(30);
  const [valoresConfirmados, setValoresConfirmados] = useState(false);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
  };

  const planoInicial = (p5) => {
    p5.background(0);
    // eixos cartesianos
    p5.strokeWeight(1);
    p5.stroke(255, 255, 0);
    p5.line(0, -canvasHeight / 2, 0, canvasHeight / 2); // x
    p5.line(-canvasWidth / 2, 0, canvasWidth / 2, 0); // y
  };

  const desenharRetaTela = (p5, x1Recortado, y1Recortado, x2Recortado, y2Recortado) => {
    p5.line(x1Recortado, -y1Recortado, x2Recortado, -y2Recortado); // Invertendo a orientação do eixo y
  };

  const desenharJanela = (p5) => {
    p5.stroke(255, 0, 255); // Azul
    // Defina a cor de preenchimento com transparência (R, G, B, A)
    p5.fill(0, 0, 0, 0);
    // Desenhe um retângulo transparente
    p5.rect(xTela, -yTela, largura, -altura);
  };

  const draw = (p5) => {
    p5.background(0); // Limpa o canvas a cada frame
    p5.translate(canvasWidth / 2, canvasHeight / 2); // Translada para o centro do canvas
    planoInicial(p5);
  
    if (valoresConfirmados) {
      // Chama a função cohenSutherland para recortar a reta
      const resultadoRecorte = cohenSutherland(xA, yA, xB, yB, xTela, yTela, xTela + largura, yTela + altura);
  
      if (resultadoRecorte) {
        // Se houver resultado do recorte, desenha a reta recortada
        const [x1Recortado, y1Recortado, x2Recortado, y2Recortado] = resultadoRecorte;

        // Verifica se a reta passa pelo interior do quadrado
        const retaPassaQuadrado =
        (x1Recortado >= xTela && x1Recortado <= xTela + largura && y1Recortado >= yTela && y1Recortado <= yTela + altura) ||
        (x2Recortado >= xTela && x2Recortado <= xTela + largura && y2Recortado >= yTela && y2Recortado <= yTela + altura);
        // Desenha a reta com cor diferente se passar pelo interior do quadrado
        if (retaPassaQuadrado) {
          p5.stroke(0, 255, 0); // Verde
        } else {
          p5.stroke(255); // Branco (cor padrão)
        }
  
        desenharRetaTela(p5, x1Recortado, y1Recortado, x2Recortado, y2Recortado);
      }
  
      desenharJanela(p5);
      desenharRetaTela(p5, xA, yA, xB, yB);

    }
  };
  

  const confirmarValores = () => {
    setValoresConfirmados(true);
  };

  const limpar = () => {
    setValoresConfirmados(false);
    setXA(0);
    setYA(0);
    setXB(0);
    setYB(0);
    setXTela(0);
    setYTela(0);
    setLargura(0);
    setAltura(0);
  };

  const cohenSutherland = (x1, y1, x2, y2, xmin, ymin, xmax, ymax) => {
    const INSIDE = 0; // 0000
    const LEFT = 1;   // 0001
    const RIGHT = 2;  // 0010
    const BOTTOM = 4; // 0100
    const TOP = 8;    // 1000
  
    // Função para determinar a região de uma coordenada
    const computeOutCode = (x, y) => {
      let code = INSIDE; // Inicialmente, a coordenada está dentro da janela
  
      if (x < xmin) {
        code |= LEFT; // Define o bit LEFT
      } else if (x > xmax) {
        code |= RIGHT; // Define o bit RIGHT
      }
  
      if (y < ymin) {
        code |= BOTTOM; // Define o bit BOTTOM
      } else if (y > ymax) {
        code |= TOP; // Define o bit TOP
      }
  
      return code;
    };
  
    // Calcula os códigos de região para os pontos inicial e final
    let outcode1 = computeOutCode(x1, y1);
    let outcode2 = computeOutCode(x2, y2);
    let accept = false;
  
    while (true) {
      if (!(outcode1 | outcode2)) {
        // Ambos pontos estão dentro da janela
        accept = true;
        break;
      } else if (outcode1 & outcode2) {
        // Ambos pontos estão fora de uma mesma borda, portanto, a linha está completamente fora
        break;
      } else {
        // A linha está parcialmente dentro da janela, precisamos calcular a interseção
  
        let x, y;
  
        // Escolhe um dos pontos fora da janela
        let outcodeOut = outcode1 ? outcode1 : outcode2;
  
        // Calcula a interseção da linha com a borda da janela
        if (outcodeOut & TOP) {
          x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
          y = ymax;
        } else if (outcodeOut & BOTTOM) {
          x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
          y = ymin;
        } else if (outcodeOut & RIGHT) {
          y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
          x = xmax;
        } else if (outcodeOut & LEFT) {
          y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
          x = xmin;
        }
  
        // Atualiza as coordenadas do ponto fora da janela
        if (outcodeOut === outcode1) {
          x1 = x;
          y1 = y;
          outcode1 = computeOutCode(x1, y1);
        } else {
          x2 = x;
          y2 = y;
          outcode2 = computeOutCode(x2, y2);
        }
      }
    }
  
    if (accept) {
      return [x1, y1, x2, y2];
    } else {
      return null; // A linha está completamente fora da janela
    }
  }

  return (
    <>
    <Menu />
      <Sketch setup={setup} draw={draw} />
      <form>
        <label>Coordenadas Ponto A:</label>
        <div>
          <label>Valor de X:</label>
          <input
            type="number"
            id="xA"
            name="xA"
            value={xA}
            onChange={(e) => setXA(e.target.value)}
          />
          <label>Valor de Y:</label>
          <input
            type="number"
            id="yA"
            name="yA"
            value={yA}
            onChange={(e) => setYA(e.target.value)}
          />
        </div>
        <label>Coordenadas Ponto B:</label>
        <div>
          <label>Valor de X:</label>
          <input
            type="number"
            id="xB"
            name="xB"
            value={xB}
            onChange={(e) => setXB(e.target.value)}
          />
          <label>Valor de Y:</label>
          <input
            type="number"
            id="yB"
            name="yB"
            value={yB}
            onChange={(e) => setYB(e.target.value)}
          />
        </div>
      </form>

      <form>
        <label>Definindo a tela de recorte:</label>
        <div>
          <label>Valor de X:</label>
          <input
            type="number"
            id="xTela"
            name="xTela"
            value={xTela}
            onChange={(e) => setXTela(e.target.value)}
          />
          <label>Valor de Y:</label>
          <input
            type="number"
            id="yTela"
            name="yTela"
            value={yTela}
            onChange={(e) => setYTela(e.target.value)}
          />
          <label>Valor da largura:</label>
          <input
            type="number"
            id="largura"
            name="largura"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
          />
          <label>Valor da altura:</label>
          <input
            type="number"
            id="altura"
            name="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>
      </form>

      <button type="button" onClick={confirmarValores}>
        Confirmar Valores
      </button>
      <button type="button" onClick={limpar}>
        Limpar
      </button>

    </>
  );
};