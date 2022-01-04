const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const dataProductsCategories = require('../data/data-categories-products.json');

const Users = db.User;
const Categories = db.CategoryProduct;

const userController = {

    index: (req, res)=>{
        //Auí después con db hay que cambiarlo cuando este listo el script sql de categorías
        res.render("index", {categorias:dataProductsCategories});

    },

    add: (req,res)=>
    {
        res.render("users/register");
    }, 

    create: (req,res)=>
    {
        let usuario= {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: req.body.contrasena,
            confirmaContrasena: req.body.confirmaContrasena,
            interests: req.body.interests
        };
        let folder = path.join(__dirname, '../data/listaUsuarios.json')
        if (fs.existsSync(folder)){
            let arregloLeidoArchivo = fs.readFileSync(folder);

            if (arregloLeidoArchivo.length == 0){
                console.log('esta vacio, ahora puedes escribir cosas en él');
                let arregloJson = [];
                arregloJson.push(usuario);
                let usuarioStringifiado = JSON.stringify(arregloJson);
                fs.writeFileSync(folder, usuarioStringifiado);
            }else{
                console.log('ya tiene data guardada');
                let arregloLeidoArchivoParseado = JSON.parse(arregloLeidoArchivo);
                arregloLeidoArchivoParseado.push(usuario);
                let arregloConvertidoJson = JSON.stringify(arregloLeidoArchivoParseado)
                fs.writeFileSync(folder, arregloConvertidoJson);

            }

        }else{
            console.log("no existe ese archivo, intenta con otro : ) ");
            let arregloJson = [];
            arregloJson.push(usuario)
            let usuarioStringifiado = JSON.stringify(arregloJson);
            fs.appendFileSync('listaUsuarios.json', usuarioStringifiado);
        }
        
        res.redirect('/');
    }, 

};


// Acá exportamos el resultado
module.exports=userController;
