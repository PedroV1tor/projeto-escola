const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const Disciplina = sequelize.define('Disciplina', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},{
  sequelize,
  tableName: 'disciplinas'
});




module.exports = Disciplina;
