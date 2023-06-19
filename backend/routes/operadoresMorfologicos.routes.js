const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/filtros.controller')

const DILATACAO = '/operadores-morfologicos/dilatacao';
const EROSAO = '/operadores-morfologicos/erosao'
const FECHAMENTO = '/operadores-morfologicos/fechamento'
const ABERTURA = '/operadores-morfologicos/abertura'
const HITORMISS = '/operadores-morfologicos/transformacao hit-or-miss'
const TOPHAT = '/operadores-morfologicos/operacao top-hat'
const BOTTOMHAT = '/operadores-morfologicos/operacao bottom-hat'


//req should be -> [{"image": "image.jpeg"}]
router.get(DILATACAO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getDilatacao(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(EROSAO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getErosao(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FECHAMENTO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFechamento(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(ABERTURA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getAbertura(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(HITORMISS, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getHitOrMiss(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(TOPHAT, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getTopHat(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(BOTTOMHAT, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getBottomHat(image))
})


module.exports = router