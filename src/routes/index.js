const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorInicio = require('../controllers/controladorInicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);


rutas.post('/', 
body('usuario')
.notEmpty().withMessage('No se aceptan valores vacios para el usuario')
.isLength({min: 3}).withMessage('La cantidad minima de caracteres son 3, para el nombre del usuario'),
body('contraseña')
.notEmpty().withMessage('No se aceptan valores vacios para la contraseña')
.isLength({min: 6}).withMessage('La cantidad minima de caracteres son 6, para el la contraseña'),

controladorInicio.ejemploPost);



rutas.put('/',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id del usuario')
.isInt().withMessage('El id del usuario debe ser entero'),
body('usuario')
.notEmpty().withMessage('No se aceptan valores vacios para el usuario')
.isLength({min: 3}).withMessage('La cantidad minima de caracteres son 3, para el nombre del usuario'),
body('contraseña')
.notEmpty().withMessage('No se aceptan valores vacios para la contraseña')
.isLength({min: 6}).withMessage('La cantidad minima de caracteres son 6, para el la contraseña'),

controladorInicio.ejemploPut);

rutas.delete('/',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id del usuario')
.isInt().withMessage('El id del usuario debe ser entero'),
controladorInicio.ejemploDelete);
module.exports = rutas;