// Acá nos falta express y el router
const express = require('express');
const router=express.Router();

const path = require('path');

const multer = require('multer');
// Aća nos falta traer el controller
const usersController = require('../controllers/usersControllers');



// ************ Multer ************ 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req,file,cb){
        cb(null,'user-' +file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//GET home page
router.get('/', usersController.index);
router.get('/users/add', usersController.add);
router.post('/users/create', usersController.create);

const upload = multer({storage: storage});