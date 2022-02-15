function guestMiddleware(req, res, next) {
	console.log(req.session.userLogged.email);
	if (req.session.userLogged.email) {
        //console.log(req.session.userLogged);
		return res.redirect('/user/profile');
	}
	next();
}

module.exports = guestMiddleware;