// Acá nos falta un objeto literal con las acciones para cada ruta
const fs = require('fs');
const path = require('path');

let folder = path.join(__dirname, '../data/data-products.json')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.Product;
const Categories = db.CategoryProduct;

const productoController = {
    productos:(req,res)=>{
        //CUIDADO hace falta agregar el de images y de ahí basarnos, pensar en como pasar string a array para create
        db.Product.findAll()
            .then(productos => {
                res.render('products/products.ejs', {productos})
            })
    }
    ,
    store: (req, res) => {
        console.log('hoaishfaoi');

        let parsePrecio = parseInt(req.body.precio);
        let parseCategoriaId = parseInt(req.body.categorias);

		let imagen

        //Si no estan los 4 archivos.. no avanza
		if(req.files[0] && req.files[1] && req.files[2] && req.files[3]){
            if(parseCategoriaId == 1){
                carpeta="anillos/";
            } else if (parseCategoriaId == 2){
                carpeta="collares/";
            }else if (parseCategoriaId == 3){
                carpeta="pulseras/";
            }
            else if (parseCategoriaId == 4){
                carpeta="piercings/";
            }else if (parseCategoriaId == 5){
                carpeta="aretes/";
            }else if (parseCategoriaId == 6){
                carpeta="relojes/";
            }
            imagen = carpeta + req.files[0].filename;
            first_image = carpeta + req.files[1].filename;
            second_image = carpeta + req.files[2].filename;
            third_image = carpeta + req.files[3].filename;	

        //Si no existe los archivos no queremos que avance
        Products
        .create(
            {
                id_category: parseCategoriaId,
                name_product: req.body.name,
                description: req.body.descripcion,
                main_image: imagen,
                price: parsePrecio,
                first_image: first_image,
                second_image: second_image,
                third_image: third_image
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
		}
        else {
            Categories
            .findAll()
                .then(categorias => {
                    res.render('products/productcreate.ejs', {categorias, title:"Nuevo"});
                })         
            .catch(error => res.send(error))
        }

        

	},
    categoria: (req, res)=>{
        let categoria =  "PRODUCTOS" 
        categoriaid =req.params.categoriaid; 
        
        //Cuando no son relojes es categoriaid = 0
        if (categoriaid == 6){   
            categoria = "RELOJES"
            Products
            .findAll(
                {
                    where: {
                        id_category: 6
                    }
                })
                .then(productos => {
                    res.render('products/productscategoria.ejs', {productos:productos, categoria:categoria});
                })         
            .catch(error => res.send(error))
        }
        else if (categoriaid == 0){
            categoria = "JOYERIA";
            Products
            .findAll(
                {
                    where: {
                        id_category: {
                          [Op.not]: 6
                        }
                    }
                })
                .then(productos => {
                    res.render('products/productscategoria.ejs', {productos:productos, categoria:categoria});
                })         
            .catch(error => res.send(error))
            //título de categoría
            //Cuando no son relojes categoriaid = 6
        }
        else {
            categoria = "JOYERIA";
            Products
            .findAll(
                {
                    where: {
                        id_category: categoriaid
                    }
                })
                .then(productos => {
                    res.render('products/productscategoria.ejs', {productos:productos, categoria:categoria});
                })         
            .catch(error => res.send(error))

        }

    }, 
    productodetail : (req,res)=>{
        db.Product.findByPk(req.params.productoid)
            .then(producto => {
                res.render('products/productdetail.ejs', {producto});
            });
    },

    productoadmin : (req,res)=>{
        Products
            .findAll()
                .then(productos => {
                    res.render('products/productsadmin.ejs', {productos});
                })         
            .catch(error => res.send(error))       
       },

    edit: (req,res)=>{

    let productoid = req.params.productoid;
    let promProducts = Products.findByPk(productoid);
    let promCategories = Categories.findAll();

    Promise
    .all([promProducts, promCategories])
    .then(([product, allCategories]) => {
        return res.render(('products/productedit.ejs'), {product:product, categorias:allCategories, title:"Editar"})})
    .catch(error => res.send(error))


    }, 
    productonuevo : (req,res)=>{
    Categories
            .findAll()
                .then(categorias => {
                    res.render('products/productcreate.ejs', {categorias, title:"Nuevo"});
                })         
            .catch(error => res.send(error))   

    },
    update: (req,res)=>{
        let productoid = req.params.productoid;
        let parsePrecio = parseInt(req.body.precio);
        let parseCategoriaId = parseInt(req.body.categoriaId);

		let imagen

		if(req.files){
            if(parseCategoriaId == 1){
                carpeta="anillos/";
            } else if (parseCategoriaId == 2){
                carpeta="collares/";
            }else if (parseCategoriaId == 3){
                carpeta="pulseras/";
            }
            else if (parseCategoriaId == 4){
                carpeta="piercings/";
            }else if (parseCategoriaId == 5){
                carpeta="aretes/";
            }else if (parseCategoriaId == 6){
                carpeta="relojes/";
            }
            imagen = carpeta + req.files[0].filename;
            first_image = carpeta + req.files[1].filename;
            second_image = carpeta + req.files[2].filename;
            third_image = carpeta + req.files[3].filename;	
		}

        Products
        .update(
            {
                id_category: parseCategoriaId,
                name_product: req.body.name_product,
                description: req.body.description,
                main_image: imagen,
                price: parsePrecio,
                first_image: first_image,
                second_image: second_image,
                third_image: third_image
            },
            {
                where: {id: productoid}
            })
        .then(()=> {
            return res.redirect('/')})            
        .catch(error => res.send(error))


        },
    delete: (req,res)=>
    {
        let productId = req.params.id
        Products
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products/admin/')})
        .catch(error => res.send(error)) 

    }, 
};


// Acá exportamos el resultado
module.exports=productoController;
