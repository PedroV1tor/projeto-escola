const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.get('/', turmaController.listarTurmas);
router.get('/adicionarform', turmaController.formCriarTurma);
router.post('/adicionar', turmaController.criarTurma);
router.post('/atualizar/:id', turmaController.atualizarTurma);
router.post('/desativar/:id', turmaController.desativarTurma);
router.post('/reativar/:id', turmaController.reativarTurma);

module.exports = router;
