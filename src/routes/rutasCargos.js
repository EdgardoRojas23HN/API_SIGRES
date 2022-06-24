const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorCargos = require('../controllers/controladorCargos');
const rutas = Router();
rutas.get('/listar', controladorCargos.Listar);


rutas.post('/guardar', 
body('nombre')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del cargo')
.isLength({min: 3}).withMessage('La cantidad minima de caracteres son 3, para el nombre del cargo'),
controladorCargos.Guardar);



rutas.put('/editar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id del cargo')
.isInt().withMessage('El id del cargo debe ser entero'),
body('nombre')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre del cargo')
.isLength({min: 3}).withMessage('La cantidad minima de caracteres son 3, para el nombre del cargo'),
controladorCargos.Editar);


rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el id del cargo')
.isInt().withMessage('El id del cargo debe ser entero'),
controladorCargos.Eliminar);


module.exports = rutas;