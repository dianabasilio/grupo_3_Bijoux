const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app= express();

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

//Requerir path rutas
const path = require('path');
const mainRouter = require('./src/routes/mainRouter');
const userRoutes = require('./src/routes/userRoutes');
const productsRouter = require('./src/routes/productsRouter');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());
app.use(userLoggedMiddleware);


const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(express.static('public'));
// para poder usar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Acá template engine
app.set('views',path.join(__dirname,'./src/views'));
app.set('view engine','ejs');

app.use('/', mainRouter);
app.use('/products/', productsRouter);
app.use('/user', userRoutes);

let port = process.env.PORT||3020;

app.listen(port, () =>{
    console.log('Servidor funcionando ' +port);
});