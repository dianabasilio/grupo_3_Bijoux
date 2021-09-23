// Acá nos falta un objeto literal con las acciones para cada ruta
const fs = require('fs');
const path = require('path');

const dataProducts = path.join(__dirname, '../data/data-products.json');
const products = JSON.parse(fs.readFileSync(dataProducts, 'utf-8'));
const dataProductsCategories = require('../data/data-categories-products.json');
let folder = path.join(__dirname, '../data/data-products.json')

const productoController = {
    productos:(req,res)=>{
        productos = products;
        res.render("products/products", {productos:productos});
    }
    ,
    store: (req, res) => {
        console.log("hola");
        console.log(req.files);
        let productos = products;

        let parsePrecio = parseInt(req.body.precio);
        let parseCategoriaId = parseInt(req.body.categorias);
        let arregloImagenes = [];

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

            arregloImagenes.push(carpeta + req.files[1].filename);
            arregloImagenes.push(carpeta + req.files[2].filename);
            arregloImagenes.push(carpeta + req.files[3].filename);
			
		} 

        let newProduct = {

            productoid : productos[productos.length - 1].productoid + 1,
            categoriaId : parseCategoriaId,
            nombreProducto: req.body.name,
            descripcion : req.body.descripcion,
            imagen : imagen,
            precio : parsePrecio,
            imagenes : arregloImagenes
            
        };

        productos.push(newProduct);
        fs.writeFileSync(folder, JSON.stringify(productos, null, 2));
        //La vista a la que llevará cuando se mande
        res.redirect('/products');


	},
    categoria: (req, res)=>{

        let productos ;
        let categoria =  "PRODUCTOS" 
        categoriaid =req.params.categoriaid; 
        
        if (categoriaid ==0){   
            categoria = "JOYERIA";
            productos = products.filter(p => p.categoriaId != 6 );
        }
        else{
            let c = dataProductsCategories.find( c =>  c.categoriaId == categoriaid );
            //título de categoría
            categoria = c.categoria  
            productos = products.filter(p => p.categoriaId == req.params.categoriaid );
        }
         
        res.render("products/productscategoria", {productos:productos, categoria:categoria});

    }, 
    productodetail : (req,res)=>{
     let    producto = products.find(p => p.productoid == req.params.productoid );            
         
         
        res.render("products/productdetail", {producto:producto});

    },

    productoadmin : (req,res)=>{
        let    productos = products;            
            
            
           res.render("products/productsadmin", {productos:productos});
   
       },
    edit: (req,res)=>{
    let    productToEdit= products.find(p => p.productoid == req.params.productoid );
    res.render("products/productedit", {title:"Editar", categorias:dataProductsCategories, productToEdit:productToEdit});
    }, 
    productonuevo : (req,res)=>{
    res.render("products/productcreate", {title:"Nuevo", categorias:dataProductsCategories, producto:{productoid:0}});

    },
    update: (req,res)=>{
        let productoid = req.params.productoid;
		let productToEdit = products.find(product => product.productoid == productoid)
		let imagen
        let imagenes=[0,0,0]

		if(req.files){
            if(productToEdit.categoriaId == 1){
                carpeta="anillos/";
            } else if (productToEdit.categoriaId == 2){
                carpeta="collares/";
            }else if (productToEdit.categoriaId == 3){
                carpeta="pulseras/";
            }
            else if (productToEdit.categoriaId == 4){
                carpeta="piercings/";
            }else if (productToEdit.categoriaId == 5){
                carpeta="aretes/";
            }else if (productToEdit.categoriaId == 6){
                carpeta="relojes/";
            }
            imagen =carpeta+ req.files[0].filename;
            imagenes[0]= carpeta+ req.files[1].filename;
            imagenes[1]= carpeta+ req.files[2].filename;
            imagenes[2]= carpeta+ req.files[3].filename;
			
		} else {
			imagen = productToEdit.imagen;
            imagenes= imagenes;
		}
        //console.log(imagenes);

		productToEdit = {
			productoid: productToEdit.productoid,
			...req.body,
			imagen: imagen,
            imagenes: imagenes,
		};
		
		let newProducts = products.map(product => {
			if (product.productoid == productToEdit.productoid) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(dataProducts, JSON.stringify(newProducts, null, 2));
		res.redirect('/');
        //res.send(imagenes);
        },

   
};


// Acá exportamos el resultado
module.exports=productoController;