const Professor = require('../models/Professor');

exports.listarProfessores = async (req, res) => {
    try {
        const professores = await Professor.findAll();
        res.status(200).json(professores);
    } catch (error) {
        res.status(500).send('Erro ao listar professores');
    }
};

exports.criarProfessor = async (req, res) => {
    const { nome, especialidade, email } = req.body;
    try {
       const professor = await Professor.create({ nome, especialidade, email });
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).send('Erro ao criar professor');
    }
};

exports.atualizarProfessor = async (req, res) => {
    const { id } = req.params;
    const { nome, especialidade, email } = req.body;
    try {
        const professor = await Professor.update({ nome, especialidade, email }, { where: { id } });
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).send('Erro ao editar professor');
    }
};

exports.desativarProfessor = async (req, res) => {
    const { id } = req.params;
    try {
        await Professor.update({ ativo: false }, { where: { id } });
        res.redirect('/professores');
    } catch (error) {
        res.status(500).send('Erro ao desativar professor');
    }
};

exports.reativarProfessor = async (req, res) => {
    const { id } = req.params;
    try {
        await Professor.update({ ativo: true }, { where: { id } });
        res.redirect('/professores');
    } catch (error) {
        res.status(500).send('Erro ao reativar professor');
    }
};


