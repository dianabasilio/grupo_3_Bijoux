const express = require('express');
const app= express();
//Requerir path 
const path = require('path');
const mainRouter = require('./src/routes/mainRouter');
const productsRouter = require('./src/routes/productsRouter');

app.use(express.static('public'));
// para poder usar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Acá template engine
app.set('views',path.join(__dirname,'./src/views'));
app.set('view engine','ejs');

app.use('/', mainRouter);
app.use('/products/', productsRouter);


let port = process.env.PORT||3030;

app.listen(port, () =>{
    console.log('Servidor funcionando ' +port);
});