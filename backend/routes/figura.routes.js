const express = require('express')

const router = express.Router()

const path = require('path')
const controller = require('../controllers/figura.controller')

const RETADDA = '/figura/reta/dda';
const RETAPONTOMEDIO = '/figura/reta/ponto-medio';
const CIRCULOEXPLICITA = '/figura/circulo/equacao-explicita';
const CIRCULOTRIGONOMETRIA = '/figura/circulo/trigonometria';
const CIRCULOPONTOMEDIO = '/figura/circulo/ponto-medio';
const ELIPSEPONTOMEDIO = '/figura/elipse/ponto-medio';
const ECG = '/ecg';

// get -> `http:localhost:3000${RETADDA}` 

//todos os retornos sao [{pontox1:x, pontoy1:y}, {pontox2:x, pontoy2:y},...]

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.post(RETADDA, (req, res, next) => {
  const [{ pontox: pontox1, pontoy: pontoy1 }, { pontox: pontox2, pontoy: pontoy2 }] = req.body;
  res.send(controller.getRetaDDA(parseInt(pontox1), parseInt(pontoy1), parseInt(pontox2), parseInt(pontoy2)))
})

//req should be -> [{"ponto1X": "x1", "ponto1Y": "y1"}, {"ponto2X": "x2", "ponto2Y": "y2"}]
router.post(RETAPONTOMEDIO, (req, res, next) => {
  const [{ pontox: pontox1, pontoy: pontoy1 }, { pontox: pontox2, pontoy: pontoy2 }] = req.body;
	res.send(controller.getRetaPontoMedio(parseInt(pontox1), parseInt(pontoy1), parseInt(pontox2), parseInt(pontoy2)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOEXPLICITA, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoEquacaoExplicita(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOPONTOMEDIO, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoPontoMedio(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"raio": "r", "xOrigem": "xOrigem", "yOrigem":"yOrigem"}]
router.post(CIRCULOTRIGONOMETRIA, (req, res, next) => {
  const [{raio, xOrigem, yOrigem}] = req.body
	res.send(controller.getCirculoMetodoTrigonometria(parseInt(raio), parseInt(xOrigem), parseInt(yOrigem)))
})

//req should be -> [{"ElipseCenter": "centerPos", "MinorRadius": "minorRadioSize"}]
router.post(ELIPSEPONTOMEDIO, (req, res, next) => {
  const { ElipseCenter, MinorRadius } = req.body[0];
  res.send(controller.getElipsePontoMedio(parseInt(ElipseCenter), parseInt(MinorRadius)));
});

router.post(ECG, (req, res, next) => {
  const { valorx, valory } = req.body;
  res.send(controller.getEcg(parseInt(valorx), parseInt(valory)));
});


module.exports = router