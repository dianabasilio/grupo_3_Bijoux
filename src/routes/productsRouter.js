// Acá nos falta express y el router
const express = require('express');
const router=express.Router();
// Aća nos falta traer el controller
const productsController = require('../controllers/productsControllers');

router.get('/', productsController.productos);
router.get('/categoria/:categoriaid?/', productsController.categoria);
router.get('/productdetail/:productoid/', productsController.productodetail);
router.get('/admin/', productsController.productoadmin);
router.get('/editar/:productoid', productsController.productoeditar);
router.get('/nuevo/', productsController.productonuevo);

module.exports = router;