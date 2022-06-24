const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorUsuarios = require('../controllers/controladorUsuarios');
const rutas = Router();
rutas.get('/listar', controladorUsuarios.Listar);


rutas.post('/guardar/',
body ('login')
.notEmpty().withMessage('No se aceptan valores vacios para el login').isLength({min:3}).withMessage('La cantidad minima de caracteres son 3 para el login del usuario'),
body ('contrasena')
.notEmpty().withMessage('No se aceptan valores vacios para la contraseña').isLength({min:6}).withMessage('La cantidad minima de caracteres son 6 para la contraseña del usuario'),
body ('empleado')
.notEmpty().withMessage('No se aceptan valores vacios para el id del empleado').isInt().withMessage('El id del empleado debe ser un entero'),
body ('correo')
.notEmpty().withMessage('No se aceptan valores vacios para el correo del usuario').isEmail().withMessage('El correo debe ser valido'),
controladorUsuarios.Guardar);

rutas.put('/editar/',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para le id del cargo').isInt().withMessage('El id del cargo debe ser un entero'),
body ('login')
.notEmpty().withMessage('No se aceptan valores vacios para el login').isLength({min:3}).withMessage('La cantidad minima de caracteres son 3 para el login del usuario'),
body ('contrasena')
.notEmpty().withMessage('No se aceptan valores vacios para la contraseña').isLength({min:6}).withMessage('La cantidad minima de caracteres son 6 para la contraseña del usuario'),
body ('empleado')
.notEmpty().withMessage('No se aceptan valores vacios para el id del empleado').isInt().withMessage('El id del empleado debe ser un entero'),
body ('correo')
.notEmpty().withMessage('No se aceptan valores vacios para el correo del usuario').isEmail().withMessage('El correo debe ser valido'),
controladorUsuarios.Editar);


rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para le id del empleadp').isInt().withMessage('El id del empleado debe ser un entero'),
controladorUsuarios.Eliminar);

module.exports = rutas;