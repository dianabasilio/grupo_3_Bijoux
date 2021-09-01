const express = require('express');

const app= express();

//Requerir path 
const path = require('path');
const mainRouter = require('./src/routes/mainRouter');

app.use(express.static('public'));

// Acá template engine
app.set('views',path.join(__dirname,'./src/views'));
app.set('view engine','ejs');

app.use('/', mainRouter);

let port = process.env.PORT||3000;

app.listen(port, () =>{
    console.log('Servidor funcionando ' +port);
});