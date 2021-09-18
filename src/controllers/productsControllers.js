// Acá nos falta un objeto literal con las acciones para cada ruta
const fs = require('fs');
const path = require('path');

const dataProducts = path.join(__dirname, '../data/data-products.json');
const products = JSON.parse(fs.readFileSync(dataProducts, 'utf-8'));
const dataProductsCategories = require('../data/data-categories-products.json');

const productoController = {
    productos:(req,res)=>{
        productos = dataProducts
        res.render("products/products", {productos:productos});
    }
    ,
    store: (req, res) => {

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
        let imagenes=[]

		if(req.files){
			imagen = req.files[0].filename
            imagenes[0]= req.files[1].filename
            imagenes[1]= req.files[2].filename
            imagenes[2]= req.files[3].filename
		} else {
			imagen = productToEdit.imagen
		}

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
		res.redirect('/products');
        },

   
};


// Acá exportamos el resultado
module.exports=productoController;