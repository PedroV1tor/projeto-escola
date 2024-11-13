const { DataTypes } = require('sequelize');
const sequelize = require('./index');  
const Professor = require('./Professor');
const Disciplina = require('./Disciplina');
const Sala = require('./Sala');

const Turma = sequelize.define('Turma', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'turmas'
});

Turma.belongsTo(Professor, { foreignKey: 'professorId' });
Turma.belongsTo(Disciplina, { foreignKey: 'disciplinaId' });
Turma.belongsTo(Sala, { foreignKey: 'salaId' });

module.exports = Turma;
