const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Equipment = require("../models/equipment.model");
const Dive = require("../models/dive.model");

const ensureAuthenticated = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.render("auth/login", { errorMsg: "Desautorizado, inicia sesión" });
const checkRole = (admittedRoles) => (req, res, next) =>
  admittedRoles.includes(req.user.role)
    ? next()
    : res.render("auth/login", {
        errorMsg: "Desautorizado, no tienes permisos",
      });

// Endpoints

/*
router.get('/', (req, res) => res.render('index'))

router.get('/perfil', ensureAuthenticated, checkRole(['GUEST', 'EDITOR', 'ADMIN']), (req, res) => res.render('profile', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))

router.get('/editar-contentidos', ensureAuthenticated, checkRole(['EDITOR', 'ADMIN']), (req, res) => res.render('context-editor', { user: req.user }))

router.get('/admin-zone', ensureAuthenticated, checkRole(['ADMIN']), (req, res) => res.render('admin', { user: req.user }))

*/

//Ruta para registrar una inmersion
router.post("/newDive", (req, res, next) => {
  const {
    owner,
    date,
    register,
    place,
    country,
    outside_temperature,
    water_temperature,
    visibility,
    start_time,
    end_time,
    duration,
    start_pressure_tank,
    end_pressure_tank,
    nitrox,
    max_depth,
    location,
    wetsuit_thickness,
    wetsuit_size,
    jacket_size,
    fins_size,
    weight,
  } = req.body;

  Dive.create({
    owner,
    date,
    register,
    place,
    country,
    outside_temperature,
    water_temperature,
    visibility,
    start_time,
    end_time,
    duration,
    start_pressure_tank,
    end_pressure_tank,
    nitrox,
    max_depth,
    location,
    wetsuit_thickness,
    wetsuit_size,
    jacket_size,
    fins_size,
    weight,
  })
    .then((createdDive) => {
      User.findByIdAndUpdate(owner, { $push: { dives: createdDive._id } }).then(
        (result) => {
          res.send(result);
        }
      );
    })
    .catch((err) => console.log(err));
});

//Ruta para obtener todas las inmersiones de un usuario

router.post("/myDives", (req, res) => {
  const { owner } = req.body;

  User.findById(owner)
    .populate("dives")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
