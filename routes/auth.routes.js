const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcryptjs")
const bcryptSalt = 10



// Registro (renderizado formulario)
router.get("/registro", (req, res) => res.render("auth/signup"))

// Registro (gestión)
router.post("/registro", (req, res, next) => {

    const { username, password, email, role } = req.body

    if (username === "" || password === "") {

        res.status(400).json({ message: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ username })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El usuario ya existe' })
                return
            }

            // Other validations
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass, email, role })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Login error' }) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
        .catch(error => next(error))
})




// Inicio sesión (renderizado formulario)
router.get("/inicio-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

// Inicio sesión (gestión)
router.post("/inicio-sesion", (req, res, next) => {
    passport.authenticate("local", (err, theUser, failureDetails) => {
      if (err) {
        res.json({ message: "Error authenticating user" });
        return;
      }
      if (!theUser) {
        res.json(failureDetails);
        return;
      }
      
      req.login(theUser, (err) =>
        err
          ? res.json({ message: "Session error" })
          : res.status(200).json(theUser)
      );
    })(req, res, next);
  }
)


// Cerrar sesión
router.get('/cerrar-sesion', (req, res) => {
    req.logout()
    res.status(200).json({ message: "Log out success!" });
})

//Validar si un usuario está conectado
router.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});


module.exports = router