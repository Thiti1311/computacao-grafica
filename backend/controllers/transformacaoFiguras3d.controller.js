const matriz = require('../util/matrizes')

class Transformacao{

// req should be in format -> [{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}},{"tipo_transformacao": "translacao", "params": {"param1":"param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y","pontoz" : "z"},{"pontox": "x", "pontoY": "Y","pontoz" : "z"},...]
  transformaPontos(req){
    let transformacoes = req[0]
    let pontosOriginais = req[1]

    m = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    transformacoes.map(transformacao => m = matriz.multiplicaMatriz(m, this.getTransformacao(transformacao.tipo_transformacao, transformacao.params)))

    let pontosTransformados = []
    pontosOriginais.map(ponto => pontosTransformados.push(matriz.multiplicaMatriz(m,[ponto.pontox, ponto.pontoy, ponto.pontoz, 1])))
  
    return pontosTransformados
  }
  
  getTransformacao(tipo_transformacao, params){
    if(tipo_transformacao === 'translacao'){
      return this.translacao(params.transX,params.transY,params.transZ)
    }
    if(tipo_transformacao === 'rotacao'){
      return this.rotacao(params.angulo, params.eixo)
    }
    if(tipo_transformacao === 'escala'){
      return this.escala(params.escalaX,params.escalaY)
    }
    if(tipo_transformacao === 'cisalhamento'){
      return this.escala(params.fatorCisalhamento1, params.fatorCisalhamento1, params.direcao)
    }
    if(tipo_transformacao === 'reflexao'){
      return this.rotacao(params.eixo)
    }
  }

  translacao(transX, transY, transZ){
    return [[transX, 0, 0, 0], [0, transY, 0, 0], [0, 0, transZ, 0], [0, 0, 0, 1]];
  }

  rotacao(angulo, eixo){
    let radians = (angulo * Math.PI) / 180;

    let cosO = Math.cos(radians);
    let senO = Math.sin(radians);

    if(eixo === 'z'){
      return [[cosO, -senO, 0, 0], [senO, cosO, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }else if(eixo === 'x'){
      return [[1, 0, 0, 0], [0, cosO, -senO, 0], [0, senO, cosO, 0], [0, 0, 0, 1]];
    }else if(eixo === 'y'){
      return [[cosO, 0, senO, 0], [0, 1, 0, 0], [-senO, 0, cosO, 0], [0, 0, 0, 1]];
    }
  }

  escala(escalaX, escalaY, escalaZ){
    return [[escalaX, 0, 0, 0], [0, escalaY, 0, 0], [0, 0, escalaZ, 0], [0, 0, 0, 1]];
  }

  cisalhamento(fatorCisalhamento1, fatorCisalhamento2, direcao){
    //cisalhamento em X
    if(direcao === 'x'){
      return [[1, 0, 0, 0], [fatorCisalhamento1, 1, 0, 0], [fatorCisalhamento2, 0, 1, 0], [0, 0, 0, 1]];
    }
    //cisalhamento em Y
    if(direcao === 'y'){
      return [[1, fatorCisalhamento1, 0, 0], [0, 1, 0, 0], [0, fatorCisalhamento2, 1, 0], [0, 0, 0, 1]];
    }
    //cisalhamento em Z
    if(direcao === 'z'){
      return [[1, 0, fatorCisalhamento1, 0], [0, 1, fatorCisalhamento2, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
  }

  reflexao(eixo){
    //reflexao em X
    if(eixo === 'x'){
      return [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
    //reflexao em Y
    if(eixo === 'y'){
      return [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
    //reflexao em Z
    if(eixo === 'z'){
      return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
    }
  }

}

module.exports = new Transformacao()