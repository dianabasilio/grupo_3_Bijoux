// Acá nos falta express y el router
const express = require('express');
const router=express.Router();

const path = require('path');

const multer = require('multer');
// Aća nos falta traer el controller
const productsController = require('../controllers/productsControllers');



// ************ Multer ************ 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const fs = require('fs');
        const dataP = path.join(__dirname, '../data/data-products.json');
        let parseCategorias = parseInt(req.body.categoriaId);

        if(parseCategorias == 1){
            carpeta="/anillos";
        } else if (parseCategorias == 2){
            carpeta="/collares";
        }else if (parseCategorias == 3){
            carpeta="/pulseras";
        }
        else if (parseCategorias == 4){
            carpeta="/piercings";
        }else if (parseCategorias == 5){
            carpeta="/aretes";
        }else if (parseCategorias == 6){
            carpeta="/relojes";
        }


        cb(null, path.join(__dirname, '../../public/images/productos/'+carpeta));
    },
    filename: function(req,file,cb){
        let parseCategorias = parseInt(req.body.categoriaId);
        cb(null,'categoria-'+parseCategorias+'-' +file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

const storageNewFile = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(req.body);
        let parseCategorias = parseInt(req.body.categorias);

        if(parseCategorias == 1){
            carpeta="/anillos";
        } else if (parseCategorias == 2){
            carpeta="/collares";
        }else if (parseCategorias == 3){
            carpeta="/pulseras";
        }
        else if (parseCategorias == 4){
            carpeta="/piercings";
        }else if (parseCategorias == 5){
            carpeta="/aretes";
        }else if (parseCategorias == 6){
            carpeta="/relojes";
        }


        cb(null, path.join(__dirname, '../../public/images/productos/'+carpeta));
    },
    filename: function(req,file,cb){
        let parseCategorias = parseInt(req.body.categorias);
        cb(null,'categoria-'+parseCategorias+'-' +file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileUpload = multer({storage: storageNewFile});

router.get('/', productsController.productos);
router.get('/categoria/:categoriaid?/', productsController.categoria);
router.get('/productdetail/:productoid/', productsController.productodetail);
router.get('/admin/', productsController.productoadmin);
router.get('/editar/:productoid', productsController.edit);

/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit);
router.patch('/editar/:productoid', upload.any(),productsController.update); 

router.get('/nuevo/', productsController.productonuevo);
// router.post('/nuevo/', productsController.store);
router.post('/nuevo', fileUpload.any(), productsController.store);

// router.post('/nuevo/', upload.single(''),productsController.productonuevo);
router.delete('/delete/:id', productsController.delete); 

module.exports = router;