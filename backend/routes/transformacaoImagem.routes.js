/*
negativo de uma imagem ->  equação: S=255-r, em que, r é o nível de cinza da imagem a ser modificada -> TDB
Transformação Gamma: S= cr γ , c=1; 0 ≤ γ≤1, r é o nível de cinza da imagem a ser transformada -> TDB
transformação logaritmo S = alog(r + 1), em que a é uma constante e r o nível de cinza da imagem -> TDB
a função de transferência de intensidade geral , r = nível de cinza, w centro dos valores de cinza e a largura da janela -> TDB
função de transferência faixa dinâmica -> TDB
função de transferência linear. -> TDB

*/

const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/filtros.controller')

const NEGATIVO = '/transformacao-de-imagem/negativo';
const GAMMA = '/transformacao-de-imagem/transformacao-gamma'
const LOGARITMO = '/transformacao-de-imagem/logaritmo'
const INTENSIDADEGERAL = '/transformacao-de-imagem/intensidade-geral'
const TRANSFERENCIAFAIXADINAMICA = '/transformacao-de-imagem/transferencia-de-faixa-dinamica'
const TRANSFERENCIALINEAR = '/transformacao-de-imagem/transferencia-linear'
const EQUALIZARHISTOGRAMA = '/transformacao-de-imagem/equalizar-histograma'


//req should be -> [{"image": "image.jpeg"}]
router.get(NEGATIVO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getNegativo(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(GAMMA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getGamma(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(LOGARITMO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getLogaritmo(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(INTENSIDADEGERAL, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getInstensidadeGeral(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(TRANSFERENCIAFAIXADINAMICA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getTransferenciaFaixaDinamica(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(TRANSFERENCIALINEAR, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getTransferenciaLinear(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(EQUALIZARHISTOGRAMA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getEqualizarHistograma(image))
})


module.exports = router