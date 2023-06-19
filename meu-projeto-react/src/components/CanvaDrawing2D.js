import React, { useRef } from 'react';

export function handleButtonClick(canvasRef, points, hasTransformed) {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  // Limpar o canvas
  context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  if(!hasTransformed){
    // Definir as transformações de coordenadas
    context.translate(canvas.width / 2, canvas.height / 2); // Centralizar o ponto (0, 0)
    context.scale(1, -1); // Inverter o eixo y
  }

  // Desenhar os pontos
  points.forEach(({ pontox, pontoy }) => {
    context.fillRect(pontox, pontoy, 1, 1);
  });
}

function CanvasDrawing({ points }) {
  const canvasRef = useRef(null);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}

export default CanvasDrawing;
useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  // Obter as dimensões da janela
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Definir o ponto médio da janela
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  // Definir as coordenadas do ponto médio no canvas
  const canvasCenterX = centerX;
  const canvasCenterY = centerY;

  // Definir o tamanho do canvas
  canvas.width = windowWidth;
  canvas.height = windowHeight;

  // Desenhar as retas
  lines.forEach(line => {
    const { pontox, pontoy } = line;

    // Calcular as coordenadas no canvas
    const canvasX = canvasCenterX + pontox;
    const canvasY = canvasCenterY - pontoy;

    context.fillRect(canvasX, canvasY, 1, 1);
  });
}, [lines]);