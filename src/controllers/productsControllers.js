// Acá nos falta un objeto literal con las acciones para cada ruta
const dataProducts = require('../data/data-products.json');
const dataProductsCategories = require('../data/data-categories-products.json');


const productoController = {
    productos:(req,res)=>{
        productos = dataProducts
        res.render("products/products", {productos:productos});
    },
    // Create -  Method to store
	store: (req, res) => {
		let image
		//req.file marca undefined si no se lleno algún dato, image por ejemplo, o name
		//console.log(req.file); 
		//console.log(...req.body); 


		//Detecta cuando sí se subió la imagen
		//req.file es undefined si le faltoo poner la imagen o algún otro como nombre
		if (req.file){

			image = req.file[0].filename
		} else{
			//Se le pone la imagen default si falta
			image = 'default-image.png'
		}

		//Crea el objeto literal directamente tomando los valores que se le metieron con req.body
		let newProduct = {
			...req.body,
			//Toma la variable image que se definió arriba
			image: image,
			//Le agrega un id siguinete, tomando el último id y sumandole a este 1
			id: products[products.length - 1].id + 1
		};
		
		//le damos push para agregar el úlitmo producto que acabamos de agregar
		products.push(newProduct);

		//Aquí actualiza
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		//La vista a la que llevará cuando se mande
		res.redirect('/products');
		
	},

    categoria: (req, res)=>{

        let productos ;
        let categoria =  "PRODUCTOS" 
        categoriaid =req.params.categoriaid; 
        
        if (categoriaid ==0){   
            categoria = "JOYERIA";
            productos = dataProducts.filter(p => p.categoriaId != 6 );
        }
        else{
            let c = dataProductsCategories.find( c =>  c.categoriaId == categoriaid );
            categoria = c.categoria  
            productos = dataProducts.filter(p => p.categoriaId == req.params.categoriaid );
        }
         
        res.render("products/productscategoria", {productos:productos, categoria:categoria});

    }, 
    productodetail : (req,res)=>{
     let    producto = dataProducts.find(p => p.productoid == req.params.productoid );            
         
         
        res.render("products/productdetail", {producto:producto});

    },

    productoadmin : (req,res)=>{
        let    productos = dataProducts;            
            
            
           res.render("products/productsadmin", {productos:productos});
   
       },
       productoeditar : (req,res)=>{
        let    producto = dataProducts.find(p => p.productoid == req.params.productoid );
        res.render("products/productcreate", {title:"Editar", categorias:dataProductsCategories, producto:producto});

       }, 
       productonuevo : (req,res)=>{
        res.render("products/productcreate", {title:"Nuevo", categorias:dataProductsCategories, producto:{productoid:0}});

       }

   
};


// Acá exportamos el resultado
module.exports=productoController;