class FiguraController {
  
  getNDC(yMax, y, yMin, xMax, x, xMin, min, max, w, h){    
    try{
      const ndH = w;
      const ndV = h; //Dps torno algo varaivel

      let ponto = [];
    
      let ndcX, ndcY;
      let dcX, dcY;

      if(min === 0 && max === 1){

        // Passo 1 w.c -> ndc
        ndcX = (x - xMin) / (xMax - xMin);
        ndcY = (y - yMin) / (yMax - yMin);

        // Passo 2 NDC  -> DC
        dcX = Math.round(ndcX * ( ndH - 1));
        dcY = Math.round(ndcY * ( ndV - 1));

      }else if(min === -1 && max === 1){

        // Passo 1 w.c -> ndc
        ndcX = ( (((x + xMin)/(xMax - xMin)) * 2) - 1);
        ndcY = ( (((y + yMin)/(yMax - yMin)) * 2) - 1);
        
        // Passo 2 NDC  -> DC
        // dcX = Math.round((( (ndcX + 1) / 2 ) * ndH) - 1);
        // dcY = Math.round((( (ndcY + 1) / 2 ) * ndV) - 1);

        dcX = Math.round( ((ndH * ndcX + ndH - 4) / 4) );
        dcY = Math.round( ((ndV * ndcY + ndV - 4) / 4) );
  
      }

      // dcX = Math.round(((ndcX - min) / (max - min)) * (ndH - max - min) + min);
      // dcY = Math.round(((ndcY - min) / (max - min)) * (ndV - max - min) + min);
      
      ponto.push({dcX,dcY, ndcX, ndcY});
  
      return ponto;
      
    } catch(error){
      console.log(error);
      throw new error(error);
    }
  }
  
  getRetaDDA(x1,y1,x2,y2){    
    let pontos = []

    let aux

    if(x2 < x1){
      aux = x2
      x2 = x1
      x1 = aux
    }
    if(y2 < y1){
      aux = y2
      y2 = y1
      y1 = aux
    }
    //descobre tamanho da reta
    let length = x2-x1

    //caso a distancia no eixo y seja maior q a distancia no eixo X ela é utilizada
    if(y2-y1 > length){
      length = y2-y1
    }

    //calcula o incremento de X e Y
    let xInc = (x2-x1)/length
    let yInc = (y2-y1)/length

    //define os pontos iniciais e os coloca no ArrayList "pontosReta"
    let x = x1
    let y = y1
    
    pontos.push({pontox: Math.round(x), pontoy: Math.round(y)})

    //enquanto x for menor que x2 o algoritmo incrementa a posicao do ponto e o coloca no Arraylist "pontosReta"
    while(x < x2){
      x+=xInc
      y+=yInc

      pontos.push({pontox: Math.round(x), pontoy: Math.round(y)})      
    }

    return pontos
  }

  getRetaPontoMedio(x1,y1,x2,y2){
    let pontos = []

    let auxX1 = x1
    let auxY1 = y1
    let auxX2 = x2
    let auxY2 = y2

    //caso o ponto 1 seja maior q o ponto 2, fazemos a inversao dos pontos
    if(x1 > x2){
      auxX1 = x2
      auxX2 = x1
    }
    if(y1 > y2){
      auxY1 = y2
      auxY2 = y1  
    }

    let dx = auxX2-auxX1
    let dy = auxY2-auxY1

    let m = dy/dx

    let IncE;
    let IncNE;
    let ds;

    if(m < 1 && m > 0){
      IncE = 2 * (dy);
      IncNE = 2 * (dy - dx);
      ds = (2 * dy) - dx;
    }else{
      IncE = 2 * (dx);

      IncNE = 2 * (dx - dy);
      ds = (2 * dx) - dy;
    }

    let d = ds;

    //derivacao da funcao para desenhar a reta em qualquer oitante
    if(m < 1 && m > 0){
      while(auxX1 < auxX2) {
          if (d >= 0) {
              auxX1 += 1;
              auxY1 += 1;
              d += IncNE;

              pontos.push({pontox:auxX1, pontoy:auxY1})
          } else {
              auxX1 += 1;
              d += IncE;

              pontos.push({pontox:auxX1, pontoy:auxY1})
          }
        }
    }else{
        while(auxY1 < auxY2){
            if ( d >= 0 ){
                auxX1 += 1;
                auxY1 += 1;
                d += IncNE;

                pontos.push({pontox:auxX1, pontoy:auxY1})
            }
            else{
                auxY1+=1;
                d+=IncE;

                pontos.push({pontox:auxX1, pontoy:auxY1})
            }
        }
    }

    return pontos
  }

  //colocar parametros
  getCirculoEquacaoExplicita(raio, xOrigem, yOrigem) {
    const pontos = [];
    let x = 0;
    let y = raio;
    let d;

    pontos.push({ pontox: x + xOrigem, pontoy: y + yOrigem});

    d = Number.isInteger(raio) ? 1 - raio : 5 / 4 - raio;
  
    x++;

    while (x < y) {
      if (d < 0) {
        x += 1;
        d = d + 2 * x + 1;
      } else {
        x += 1;
        y -= 1;
        d += (2 * x) - (2 * y) + 1;
      }
      const pontosSimetricos = [
        [x, y],
        [-x, y],
        [x, -y],
        [-x, -y],
        [y, x],
        [-y, x],
        [y, -x],
        [-y, -x]
      ];

      pontosSimetricos.forEach(([pontox, pontoy]) => {
        pontos.push({ pontox: pontox + xOrigem, pontoy: pontoy + yOrigem });
        if(pontox === 0){
          pontos.get();
        }
      });
    }
    pontos.push({ pontox: x, pontoy: y });
    return pontos;
  }
  // getCirculoEquacaoExplicita(raio, xOrigem, yOrigem) {
  //   const pontos = [];
  //   let x = 0;
  //   let y = raio;
  
  //   pontos.push({ pontox: x + xOrigem, pontoy: y + yOrigem });
  
  //   while (x <= y) {
  //     x = x + 1;
  //     y = Math.round(Math.sqrt(raio * raio - x * x));
  
  //     const pontosSimetricos = [
  //       [x, y],
  //       [-x, y],
  //       [x, -y],
  //       [-x, -y],
  //       [y, x],
  //       [-y, x],
  //       [y, -x],
  //       [-y, -x]
  //     ];
  
  //     pontosSimetricos.forEach(([pontox, pontoy]) => {
  //       pontos.push({ pontox: pontox + xOrigem, pontoy: pontox + yOrigem });
  //     });
  //   }
  
  //   return pontos;
  // }

  //colocar parametros
  getCirculoPontoMedio(raio, xOrigem, yOrigem){
    const pontos = [];
    let x = 0;
    let y = raio;
    let p_medio;
    
    pontos.push({ pontox: x + xOrigem, pontoy: y + yOrigem });
    
    if (Number.isInteger(raio)) {
      p_medio = 1 - raio;
    } else {
      p_medio = (5 / 4) - raio;
    }
    
    while (x <= y) {
      if (p_medio < 0) {
        const incrementoX = x + 1;
        p_medio += 2 * incrementoX + 1;
        x = incrementoX;
      } else {
        const incrementoX = x + 1;
        const decrementoY = y - 1;
        p_medio += 2 * (incrementoX - decrementoY);
        x = incrementoX;
        y = decrementoY;
      }
    
      const pontosSimetricos = [
        [x, y],
        [-x, y],
        [x, -y],
        [-x, -y],
        [y, x],
        [-y, x],
        [y, -x],
        [-y, -x]
      ];
    
      pontosSimetricos.forEach(([pontox, pontoy]) => {
        pontos.push({ pontox: pontox + xOrigem, pontoy: pontoy + yOrigem });
      });
    }
    
    pontos.push({ pontox: x - 1, pontoy: y });
    

    return pontos;
  }
  
  //colocar parametros
  getCirculoMetodoTrigonometria(raio, xOrigem, yOrigem){
    
    const incrementoAngulo = Math.PI / 180;
    const pontos = [];
    
    for (let angulo = 0; angulo <= 2 * Math.PI; angulo += incrementoAngulo) {
      const x = xOrigem + raio * Math.cos(angulo);
      const y = yOrigem + raio * Math.sin(angulo);
      pontos.push({ pontox: Math.round(x), pontoy: Math.round(y) });
    }
    
    const ultimoPonto = pontos[pontos.length - 1];
    pontos.push({ pontox: Math.round(ultimoPonto[0]), pontoy:  Math.round(ultimoPonto[1]) });
    
    return pontos;
  }

  getElipsePontoMedio(elipseCenter, minorRadius) {
    const pontos = [];
  
    let dx, dy, d1, d2, x, y;
    x = 0;
    y = minorRadius;
  
    // Decisao inicial de regiao
    d1 = (minorRadius * minorRadius) - (elipseCenter * elipseCenter * minorRadius) +
      (0.25 * elipseCenter * elipseCenter);
    dx = 2 * minorRadius * minorRadius * x;
    dy = 2 * elipseCenter * elipseCenter * y;
  
    // Para primeira regiao
    while (dx < dy) {
  
      // adicionando pontos baseado na simetria de 4 lados
      pontos.push({ pontox: x, pontoy: y });
      pontos.push({ pontox: x, pontoy: -y });
      pontos.push({ pontox: -x, pontoy: y });
      pontos.push({ pontox: -x, pontoy: -y });
  
      // Checking and updating value of
      // decision parameter based on algorithm
      if (d1 < 0) {
        x++;
        dx = dx + (2 * minorRadius * minorRadius);
        d1 = d1 + dx + (minorRadius * minorRadius);
      } else {
        x++;
        y--;
        dx = dx + (2 * minorRadius * minorRadius);
        dy = dy - (2 * elipseCenter * elipseCenter);
        d1 = d1 + dx - dy + (minorRadius * minorRadius);
      }
    }
  
    // Decision parameter of region 2
    d2 = ((minorRadius * minorRadius) * ((x + 0.5) * (x + 0.5)))
      + ((elipseCenter * elipseCenter) * ((y - 1) * (y - 1)))
      - (elipseCenter * elipseCenter * minorRadius * minorRadius);
  
    // Plotting points of region 2
    while (y >= 0) {
  
      // adicionando pontos baseado na simetria de 4 lados
      pontos.push({ pontox: x, pontoy: y });
      pontos.push({ pontox: -x, pontoy: y });
      pontos.push({ pontox: x, pontoy: -y });
      pontos.push({ pontox: -x, pontoy: -y });
  
      // Checking and updating parameter
      // value based on algorithm
      if (d2 > 0) {
        y--;
        dy = dy - (2 * elipseCenter * elipseCenter);
        d2 = d2 + (elipseCenter * elipseCenter) - dy;
      } else {
        y--;
        x++;
        dx = dx + (2 * minorRadius * minorRadius);
        dy = dy - (2 * elipseCenter * elipseCenter);
        d2 = d2 + dx - dy + (elipseCenter * elipseCenter);
      }
    }
    return pontos;
  }
}

module.exports = new FiguraController()