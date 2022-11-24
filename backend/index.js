const express = require('express');
const mongoose = require('mongoose');
const app1 = express();
const port = 5000;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const bodyParser = require('body-parser');
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({extended:false}));

// CONEXIÓN A LA BBDD
mongoose
    //.connect("mongodb://localhost:27017/trueke_g47")
    .connect("mongodb+srv://jorandho:abc12345@curso-platzi.umzx8wk.mongodb.net/codeKitchen?retryWrites=true&w=majority")
    .then(console.log("Conectado a la BBDD"))

//CORS
const cors = require('cors');
app1.use(cors());

require('./utils/auth');

//RUTAS
const rutas_rec = require('./router/rutas_rec');
app1.use('/recetas', rutas_rec);

const rutas_usr = require('./router/rutas_usr');
app1.use('/usuarios', rutas_usr);

const rutaAuth = require('./router/rutaAutenticacion');
app1.use('/auth', rutaAuth);

app1.use(logErrors);
app1.use(boomErrorHandler);
app1.use(errorHandler);

app1.listen(port, () => console.log('Servidor levantado'));