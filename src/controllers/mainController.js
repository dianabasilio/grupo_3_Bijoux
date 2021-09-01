// Acá nos falta un objeto literal con las acciones para cada ruta
const data = require('../data/data');

const mainController = {
    index: (req, res)=>{
        res.render("index", {categorias:data.categorias});

    }
    ,
    carrito: (req, res)=>{
        res.render("carrito");

    },
    login: (req, res)=>{
        res.render("login");

    },
    productdetail: (req, res)=>{
        res.render("productdetail");

    },
    register: (req, res)=>{
        res.render("register");

    }
};


// Acá exportamos el resultado
module.exports=mainController;