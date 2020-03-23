const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');


//cria a aplicação
const app = express();
const server = http.Server(app);

setupWebsocket(server);





mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ata4b.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(4113)




//Metodos HTTP: GET (PEGAR), POST (COLOCAR), PUT (ALTERAR), DELETE (DELETAR)

//TIPOS DE PARAMETROS:

//Query params: req.query (Filtros, ordenação, paginação)
//Route params: req.params (identificar mudanças)
//Body: req.body (Dados para criação ou alteração de um registro)