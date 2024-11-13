
const express = require('express');
const bodyParser = require('body-parser');
const disciplinaRoutes = require('./src/routes/disciplinas');
const professorRoutes = require('./src/routes/professorRoutes');
const salaRoutes = require('./src/routes/salaRoutes');
const turmaRoutes = require('./src/routes/turmaRoutes');
const sequelize = require('./src/models');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.use('/disciplinas', disciplinaRoutes);
app.use('/professores', professorRoutes);
app.use('/salas', salaRoutes);
app.use('/turmas', turmaRoutes);



sequelize.sync().then(() => {
    app.listen(3040, () => {
        console.log('Servidor rodando na porta 3040');
    });
}).catch((err) => {
    console.error('Erro ao sincronizar banco de dados:', err);
});

