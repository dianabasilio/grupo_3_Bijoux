// Acá nos falta un objeto literal con las acciones para cada ruta

let fs = require('fs');
const path = require('path');


const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Categories = db.CategoryProduct;
const Products = db.Product;

const mainController = {
    index: (req, res)=>{
        Categories.findAll()
            .then(categorias => {
                res.render('index.ejs', {categorias})
            })
    }
    ,
    carrito: (req, res)=>{
        res.render("carrito");

    },
    productdetail: (req, res)=>{
        res.render("products/productdetail");

    },

};


// Acá exportamos el resultado
module.exports=mainController;