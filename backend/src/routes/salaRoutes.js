const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

router.get('/', salaController.listarSalas);
router.post('/adicionar', salaController.criarSala);
router.post('/atualizar/:id', salaController.atualizarSala);
router.post('/desativar/:id', salaController.desativarSala);
router.post('/reativar/:id', salaController.reativarSala);

module.exports = router;
