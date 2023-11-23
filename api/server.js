const express = require('express')
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://database:27017/dbtest", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function checkDb(error) {
    if (error) {
        console.log("Error conectando a la DB");
    } else {
        console.log("Conectado a la DB");
    }
});

app.options('*', cors())
app.use(cors())

app.use(express.json());
app.use(routes);

app.listen(9002, function check(error) {
    if (error)
        console.log("Error de inicio!");
    else
        console.log("Iniciado!");
});

