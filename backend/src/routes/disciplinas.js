const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.post('/adicionar', disciplinaController.criarDisciplina);
router.get('/', disciplinaController.listarDisciplinas);
router.post('/atualizar/:id', disciplinaController.atualizarDisciplina);
router.post('/desativar/:id', disciplinaController.desativarDisciplina);
router.post('/reativar/:id', disciplinaController.reativarDisciplina);

module.exports = router;
