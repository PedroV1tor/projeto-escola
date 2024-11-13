const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController'); // Controlador

router.get('/', professorController.listarProfessores);
router.post('/atualizar/:id', professorController.atualizarProfessor);
router.post('/adicionar', professorController.criarProfessor);
router.post('/desativar/:id', professorController.desativarProfessor);
router.post('/reativar/:id', professorController.reativarProfessor);
module.exports = router;
