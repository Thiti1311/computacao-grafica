const express = require('express')

const router = express.Router()

const path = require('path')
const controller2d = require('../controllers/transformacaoFiguras2d.controller.js')
const controller3d = require('../controllers/transformacaoFiguras3d.controller')
const RecorteTela = require('../controllers/recorteTela.controller')

const URL_BASE = '/recorte';

const TRANSFORMACAO2D = `${URL_BASE}/transformacao-2d`;
const TRANSFORMACAO3D = `${URL_BASE}/transformacao-3d`;
const COHEN_SUTHERLAND = `${URL_BASE}/cohen-sutherland`;


// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y"},{"pontox": "x", "pontoY": "Y"},...]
router.post(TRANSFORMACAO2D, (req, res, next) => {
	res.send(controller2d.transformaPontos(req))
})

// req should be in format -> [{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...},{"tipo_transformacao": "translacao", "param1": "param1", "param2": "param2", ...}][{"pontox": "x", "pontoY": "Y","pontoz": "z"},{"pontox": "x", "pontoY": "Y","pontoz": "z"},...]
// No transformacaoFiguras3d.controller.js
router.post(TRANSFORMACAO3D, (req, res, next) => {
	console.log('Rota de transformacao-3d acessada');
	try {
	  const pontosTransformados = controller3d.transformaPontos(req);
	  console.log('Pontos Transformados:', pontosTransformados);
	  res.send(pontosTransformados);
	} catch (error) {
	  console.error('Erro na transformação 3D:', error);
	  res.status(500).send('Erro interno na transformação 3D');
	}
  });
  
router.get(TRANSFORMACAO3D, (req, res, next) => {
	console.log('Rota de transformacao-3d acessada'); // Adicione este log

	try {
	  const pontosTransformados = controller3d.transformaPontos(req);
	  console.log('Pontos Transformados:', pontosTransformados); // Adicione este log
	  res.send(pontosTransformados);
	} catch (error) {
	  console.error('Erro na transformação 3D:', error); // Adicione este log
	  res.status(500).send('Erro interno na transformação 3D');
	}
	res.send(controller3d.transformaPontos(req))		
})

router.get(COHEN_SUTHERLAND, (req, res, next) => {
	res.send(RecorteTela.cohenSutherlandClip(req))		
})			

module.exports = router