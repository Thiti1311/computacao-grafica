import React, { useRef } from 'react';

export function handleButtonClick(canvasRef, points, hasTransformed, w, h) {
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
      <canvas ref={canvasRef} width={w} height={h} />
    </div>
  );
}

export default CanvasDrawing;
