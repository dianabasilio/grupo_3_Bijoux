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
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage})


router.get('/', productsController.productos);
router.get('/categoria/:categoriaid?/', productsController.categoria);
router.get('/productdetail/:productoid/', productsController.productodetail);
router.get('/admin/', productsController.productoadmin);
router.get('/editar/:productoid', productsController.edit);

/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit);
router.patch('/editar/:productoid', upload.any(),productsController.update); 

router.get('/nuevo/', productsController.productonuevo);
router.post('/nuevo/', upload.single(''),productsController.productonuevo);


module.exports = router;