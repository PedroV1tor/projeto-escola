const Sala = require('../models/Sala');

exports.listarSalas = async (req, res) => {
    try {
        const sala = await Sala.findAll();
        res.status(200).json(sala);
    } catch (error) {
        res.status(500).send('Erro ao listar salas');
    }
};

exports.criarSala = async (req, res) => {
    const { nome, capacidade, localizacao } = req.body;
    try {
        const sala = await Sala.create({ nome, capacidade, localizacao });
        res.status(200).json(sala);
    } catch (error) {
        res.status(500).send('Erro ao criar sala');
    }
};

exports.atualizarSala = async (req, res) => {
    const { id } = req.params;
    const { nome, capacidade, localizacao } = req.body;
    try {
        const sala = await Sala.update({ nome, capacidade, localizacao }, { where: { id } });
        res.status(200).json(sala);
    } catch (error) {
        res.status(500).send('Erro ao editar sala');
    }
};

exports.desativarSala = async (req, res) => {
    const { id } = req.params;
    try {
        await Sala.update({ ativo: false }, { where: { id } });
        res.redirect('/salas');
    } catch (error) {
        res.status(500).send('Erro ao desativar sala');
    }
};

exports.reativarSala = async (req, res) => {
    const { id } = req.params;
    try {
        await Sala.update({ ativo: true }, { where: { id } });
        res.redirect('/salas');
    } catch (error) {
        res.status(500).send('Erro ao reativar sala');
    }
};
