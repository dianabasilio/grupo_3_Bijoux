// Acá nos falta express y el router
const express = require('express');
const router=express.Router();
// Aća nos falta traer el controller
const mainController = require('../controllers/mainController');

// Acá definimos las rutas

//GET home page
router.get('/', mainController.index);
//GET carrito page
router.get('/carrito', mainController.carrito);
//GET productdetail page
router.get('/productdetail', mainController.productdetail);




// Acá exportamos el resultado
module.exports=router;