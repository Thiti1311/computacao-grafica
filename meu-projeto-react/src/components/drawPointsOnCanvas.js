import React, { useRef } from 'react';
export function handleButtonClick(canvasRef, points, hasTransformed) {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');

  // Limpar o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!hasTransformed) {
    // Centralizar o ponto (0, 0) no meio do canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    context.translate(centerX, centerY);

    // Inverter o eixo y
    context.scale(1, -1);
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
