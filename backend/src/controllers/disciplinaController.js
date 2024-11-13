const Disciplina = require('../models/Disciplina');


exports.criarDisciplina = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
     const disciplina = await Disciplina.create({ nome, descricao });
      res.status(200).json(disciplina);
  } catch (error) {
      res.status(500).send('Erro ao criar Disciplina');
  }
};

exports.listarDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
};

exports.atualizarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const disciplina = await Disciplina.findByPk(id);
    if (disciplina) {
      await disciplina.update({ nome, descricao });
      res.status(200).json(disciplina);
    } else {
      res.status(404).json({ error: 'Disciplina não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar disciplina' });
  }
};

exports.desativarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const disciplina = await Disciplina.findByPk(id);
    if (disciplina) {
      await disciplina.update({ ativa: false });
      res.status(200).json(disciplina);
    } else {
      res.status(404).json({ error: 'Disciplina não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desativar disciplina' });
  }
};

exports.reativarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const disciplina = await Disciplina.findByPk(id);
    if (disciplina) {
      await disciplina.update({ ativa: true });
      res.status(200).json(disciplina);
    } else {
      res.status(404).json({ error: 'Disciplina não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao reativar disciplina' });
  }
};
