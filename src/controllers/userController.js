const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const bcryptjs = require('bcryptjs');
const {
	validationResult
} = require('express-validator');

const Users = db.User;

const userController = {

    register: (req, res) => {
		return res.render('users/register.ejs');
	},
	processRegister: (req, res) => {
		console.log(req.file);
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register.ejs', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = Users.findByPk(req.body.email);
		console.log('userIndb:  '+userInDB)

		if (!userInDB) {
			return res.render('users/register.ejs', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		Users
        .create(
            {
                ...req.body,
				image_path: req.file.filename,
				password: bcryptjs.hashSync(req.body.password, 10)
            }
        )
        .then(()=> {
            return res.redirect('/user/login')})            
        .catch(error => res.send(error))

	},
	login: (req, res) => {
		return res.render('users/login.ejs');
	},
	loginProcess: (req, res) => {
		console.log('proceso login');
		console.log('email: '+req.body.email);
		let userToLogin = Users.findByPk(req.body.email);
		console.log('userToLogin: '+userToLogin);

		Promise
		.all([userToLogin])
		.then(([userToLogin]) => {

			if(userToLogin !== null ) {
				console.log('Ya se dio cuenta que existe el user');
				console.log('user listo: '+userToLogin);
				console.log('password del body: '+req.body.password);
				console.log('password encrypted: '+userToLogin.password);
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					console.log('Debiste entrar correctamente'+req.session);
					console.log('user listo: '+userToLogin);
					//eliminando la contraseña por seguridad
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
					console.log('user listo con req.session: '+req.session.userLogged);
	
					if(req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
					}
	
					return res.render('users/userProfile.ejs', {
						user: req.session.userLogged
					});
				}
				console.log('Pusiste mal contraseña'+userToLogin);
				return res.render('users/login.ejs', {
					errors: {
						email: {
							msg: 'Las credenciales son inválidas'
						}
					}
				});
			}
			else {
				console.log('No estabas en base de datos'+userToLogin);
				return res.render('users/login.ejs', {
					errors: {
						email: {
							msg: 'No se encuentra este email en nuestra base de datos, registrarse'
						}
					}
				});
			}


		})
		.catch(error => res.send(error))
		
		
	},
	profile: (req, res) => {
		return res.render('users/userProfile.ejs', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

};


// Acá exportamos el resultado
module.exports=userController;