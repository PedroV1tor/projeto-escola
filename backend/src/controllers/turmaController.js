const Turma = require('../models/Turma');
const Professor = require('../models/Professor');
const Disciplina = require('../models/Disciplina');
const Sala = require('../models/Sala');

exports.listarTurmas = async (req, res) => {
    try {
        const turmas = await Turma.findAll({
            include: [Professor, Disciplina, Sala]
        });
        res.status(200).json(turmas);
    } catch (error) {
        res.status(500).send('Erro ao listar turmas');
    }
};

exports.formCriarTurma = async (req, res) => {
    try {
        const professores = await Professor.findAll();
        const disciplinas = await Disciplina.findAll();
        const salas = await Sala.findAll();
        res.render('formTurma', { professores, disciplinas, salas });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de criação de turma');
    }
};

exports.criarTurma = async (req, res) => {
    const { nome, periodo, professorId, disciplinaId, salaId } = req.body;
    try {
        const turma = await Turma.create({ nome, periodo, professorId, disciplinaId, salaId });
        res.status(200).json(turma);
    } catch (error) {
        res.status(500).send('Erro ao criar turma');
    }
};

exports.atualizarTurma = async (req, res) => {
    const { id } = req.params;
    const { nome, periodo, professorId, disciplinaId, salaId } = req.body;
    console.log(req.body)
    try {
        const turma = await Turma.update({ nome, periodo, professorId, disciplinaId, salaId }, { where: { id } });
        res.status(200).json(turma);
    } catch (error) {
        res.status(500).send('Erro ao editar turma');
    }
};

exports.desativarTurma = async (req, res) => {
    const { id } = req.params;
    try {
        await Turma.update({ ativo: false }, { where: { id } });
        res.redirect('/turmas');
    } catch (error) {
        res.status(500).send('Erro ao desativar turma');
    }
};

exports.reativarTurma = async (req, res) => {
    const { id } = req.params;
    try {
        await Turma.update({ ativo: true }, { where: { id } });
        res.redirect('/turmas');
    } catch (error) {
        res.status(500).send('Erro ao reativar turma');
    }
};
