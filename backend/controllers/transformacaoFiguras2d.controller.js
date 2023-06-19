const matriz = require('../util/matrizes')

class Transformacao{

// req should be in format -> [{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}},{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
  transformaPontos(req){
    let transformacoes = req[0]
    let pontosOriginais = req[1]

    m = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
    transformacoes.map(transformacao => m = matriz.multiplicaMatriz(m, this.getTransformacao(transformacao.tipo_transformacao, transformacao.params)))

    let pontosTransformados = []
    pontosOriginais.map(ponto => pontosTransformados.push(matriz.multiplicaMatriz(m,[ponto.pontox, ponto.pontoy, 1])))
  
    return pontosTransformados
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