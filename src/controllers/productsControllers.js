// Acá nos falta un objeto literal con las acciones para cada ruta
const data = require('../data/data');

const productoController = {
    productos:(req,res)=>{
        productos = data.productos
        res.render("products/products", {productos:productos});
    }
    ,
    categoria: (req, res)=>{

        let productos ;
        let categoria =  "PRODUCTOS" 
        categoriaid =req.params.categoriaid; 
        
        if (categoriaid ==0){   
            categoria = "JOYERIA";
            productos = data.productos.filter(p => p.categoriaId != 6 );
        }
        else{
            let c = data.categorias.find( c =>  c.categoriaId == categoriaid );
            categoria = c.categoria  
            productos = data.productos.filter(p => p.categoriaId == req.params.categoriaid );
        }
         
        res.render("products/productscategoria", {productos:productos, categoria:categoria});

    }, 
    productodetail : (req,res)=>{
     let    producto = data.productos.find(p => p.productoid == req.params.productoid );            
         
         
        res.render("products/productdetail", {producto:producto});

    },

    productoadmin : (req,res)=>{
        let    productos = data.productos;            
            
            
           res.render("products/productsadmin", {productos:productos});
   
       },
       productoeditar : (req,res)=>{
        let    producto = data.productos.find(p => p.productoid == req.params.productoid );
        res.render("products/productcreate", {title:"Editar", categorias:data.categorias, producto:producto});

       }, 
       productonuevo : (req,res)=>{
        res.render("products/productcreate", {title:"Nuevo", categorias:data.categorias, producto:{productoid:0}});

       }

   
};


// Acá exportamos el resultado
module.exports=productoController;