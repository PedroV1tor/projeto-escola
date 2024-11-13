const { DataTypes } = require('sequelize');
const sequelize = require('./index');  
const Sala = sequelize.define('Sala', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'salas'
});

module.exports = Sala;
