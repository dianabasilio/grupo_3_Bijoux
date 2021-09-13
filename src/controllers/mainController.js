// Acá nos falta un objeto literal con las acciones para cada ruta
const data = require('../data/data-products.json');
const dataProductsCategories = require('../data/data-categories-products.json');

const mainController = {
    index: (req, res)=>{
        res.render("index", {categorias:dataProductsCategories});

    }
    ,
    carrito: (req, res)=>{
        res.render("carrito");

    },
    login: (req, res)=>{
        res.render("users/login");

    },
    productdetail: (req, res)=>{
        res.render("products/productdetail");

    },
    register: (req, res)=>{
        res.render("users/register");

    }
};


// Acá exportamos el resultado
module.exports=mainController;