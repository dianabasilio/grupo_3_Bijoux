const fs = require('fs');
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Users = db.User;

const userController = {

    register: (req, res) => {
		return res.render('users/register.ejs');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register.ejs', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = Users.findByPk(req.body.email);

		if (userInDB) {
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
				password: bcryptjs.hashSync(req.body.password, 10),
				avatar: req.file.filename
            }
        )
        .then(()=> {
            return res.redirect('users/login.ejs')})            
        .catch(error => res.send(error))

	},
	login: (req, res) => {
		return res.render('users/login.ejs');
	},
	loginProcess: (req, res) => {
		let userToLogin = Users.findByPk(req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				//eliminando la contraseña por seguridad
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('users/userProfile.ejs');
			} 
			return res.render('users/login.ejs', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login.ejs', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos, registrarse'
				}
			}
		});
	},
	profile: (req, res) => {
		console.log(req.session);
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
