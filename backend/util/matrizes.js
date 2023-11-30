class Matrizes{

  constructor() {
    this.matriz1 = null;
    this.matriz2 = null;
  }

  defineMatriz1(matriz) {
    this.matriz1 = matriz;
  }

  defineMatriz2(matriz) {
    this.matriz2 = matriz;
  }

  multiplicaMatriz() {
    // console.log('------ matriz1')
    // console.log(this.matriz1)
    // console.log('------ matriz2')
    // console.log(this.matriz2)
    // console.log('------ fim')


    const rows1 = this.matriz1.length;
    const cols1 = this.matriz1[0].length;
    const rows2 = this.matriz2.length;
    const cols2 = this.matriz2[0].length;
  
    if (cols1 !== rows2) {
      throw new Error('As matrizes não podem ser multiplicadas. O número de colunas da matriz1 deve ser igual ao número de linhas da matriz2.');
    }
  
    const result = [];
    for (let i = 0; i < rows1; i++) {
      result[i] = [];
      for (let j = 0; j < cols2; j++) {
        result[i][j] = 0;
        for (let k = 0; k < cols1; k++) {
          result[i][j] += this.matriz1[i][k] * this.matriz2[k][j];
        }
      }
    }
    return result;
  }
}
module.exports = new Matrizes()