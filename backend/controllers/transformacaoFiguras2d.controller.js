const matriz = require('../util/matrizes')

class Transformacao{

// req should be in format -> [{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}},{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
  transformaPontos(req){
    let transformacoes = req.body.transformacoes;
    let pontosOriginais = req.body.pontosOriginais;

    let m = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

    matriz.defineMatriz1(m)


    transformacoes.forEach((transformacao) => {
      const tipoTransformacao = transformacao.tipo_transformacao;
      const parametros = transformacao.params;
    
      let m2 = this.getTransformacao(tipoTransformacao, parametros);
      
      matriz.defineMatriz2(m2);
    
      // Acumula as transformações multiplicando as matrizes
      m = matriz.multiplicaMatriz();
    });

    let pontosTransformados = [];
    
    matriz.defineMatriz1(m);

    pontosOriginais.map((ponto) => {
      const pontoX = ponto.pontox;
      const pontoY = ponto.pontoy;

      matriz.defineMatriz2([
        [pontoX, pontoY, 1],
        [0, 0, 1],
        [0, 0, 1]
      ]);
    
      // Arredonda os valores da matriz resultante
      const pontoTransformado = matriz.multiplicaMatriz().map(row => row.map(val => Math.round(val)));
    
      pontosTransformados.push(pontoTransformado);
    });
    
    return pontosTransformados;
  }
  
  getTransformacao(tipo_transformacao, params){
    if(tipo_transformacao === 'translacao'){
      return this.translacao(params.transX,params.transY)
    }
    if(tipo_transformacao === 'rotacao'){
      return this.rotacao(params.angulo)
    }
    if(tipo_transformacao === 'escala'){
      return this.escala(params.escalaX,params.escalaY)
    }
    if(tipo_transformacao === 'cisalhamento'){
      return this.escala(params.fatorCisalhamento,params.direcao)
    }
    if(tipo_transformacao === 'reflexao'){
      return this.rotacao(params.eixo)
    }
  }

  translacao(transX, transY){
    return [[transX, 0, 0], [0, transY, 0], [0, 0, 1]];
  }

  rotacao(angulo){
    let radians = (angulo * Math.PI) / 180;

    let cosO = Math.cos(radians);
    let senO = Math.sin(radians);

    return [[cosO, -senO, 0], [senO, cosO, 0], [0, 0, 1]];
  }

  escala(escalaX,escalaY){
    return [[escalaX, 0, 0], [0, escalaY, 0], [0, 0, 1]];
  }

  cisalhamento(fatorCisalhamento,direcao){
    //cisalhamento em X
    if(direcao === 'x'){
      return [[0, fatorCisalhamento, 0], [0, 1, 0], [0, 0, 1]];
    }
    //cisalhamento em Y
    return [[1, 0, 0], [fatorCisalhamento, 1, 0], [1, 0, 1]];
  }

  reflexao(eixo){
    //reflexao em X
    if(eixo === 'x'){
      return [[1, 0, 0], [0, -1, 0], [0, 0, 1]];
    }
    //reflexao em Y
    return [[-1, 0, 0], [0, 1, 0], [0, 0, 1]];
  }

}

module.exports = new Transformacao()