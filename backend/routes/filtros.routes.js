const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/filtros.controller')

const FILTROMEDIA = '/filtro/media';
const FILTROMEDIANA = '/filtro/mediana'
const FILTROPASSAALTABASICO = '/filtro/passa alta basico'
const FILTROROBERTS = '/filtro/operador de roberts'
const FILTROROBERTSCRUZADO = '/filtro/operador de roberts cruzado'
const FILTROPREWITT = '/filtro/operador de prewitt'
const FILTROHIGHBOOST = '/filtro/alto reforço'
const FILTROSOBEL = '/filtro/operador de sobel'
const FILTROCUSTOM = '/filtro/custom'


// get -> `http:localhost:3000${RETADDA}` 

//todos os retornos sao [{pontox1:x, pontoy1:y}, {pontox2:x, pontoy2:y},...]

//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROMEDIA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroMedia(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROMEDIANA, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroMediana(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROPASSAALTABASICO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroPassaAltaBasico(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROROBERTS, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroRoberts(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROROBERTSCRUZADO, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroRobertsCruzado(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROPREWITT, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroPrewitt(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROHIGHBOOST, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroHighBoost(image))
})
//req should be -> [{"image": "image.jpeg"}]
router.get(FILTROSOBEL, (req, res, next) => {
  const [{image}] = JSON.parse(req)
	res.send(controller.getFiltroSobel(image))
})
//req should be -> [{"image": "image.jpeg"}, {"matriz_do_filtro": "matriz_do_filtro"}]
router.get(FILTROCUSTOM, (req, res, next) => {
  const [{image, matriz_do_filtro}] = JSON.parse(req)
	res.send(controller.getFiltroCustom(image, matriz_do_filtro))
})

module.exports = router