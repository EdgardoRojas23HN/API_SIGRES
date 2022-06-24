const { Router } = require ('express');
const { body,query } = require ('express-validator');
const controladorEmpleados = require('../controllers/controladorEmpleados');//
const rutas = Router();

rutas.get('/listar', controladorEmpleados.Listar);

rutas.post('/guardar/',
body ('identidad')
.notEmpty().withMessage('No se aceptan valores vacios para la identidad del empleado').
isLength({min:3}).withMessage('La cantidad minima de caracteres son 3, para la identidad del empleado'),
body ('apellido')
.notEmpty().withMessage('No se aceptan valores vacios para el apellido del empleado').
isLength({min:3}).withMessage('La cantidad minima de caracteres son 3, para la apellido del empleado'),
controladorEmpleados.Guardar);


rutas.put('/editar/',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para le id del cargo').isInt().withMessage('El id del cargo debe ser un entero'),
body ('apellido')
.notEmpty().withMessage('No se aceptan valores vacios para el apellido').isLength({min:3}).withMessage('La cantidad minima de caracteres son 3 para el apellido del empleado'),
body ('salario')
.notEmpty().withMessage('No se aceptan valores vacios para el salario').isFloat().withMessage('La cantidad la cantidad del salario debe ser un flotante'),
controladorEmpleados.Editar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para le id del empleadp').isInt().withMessage('El id del empleado debe ser un entero'),
controladorEmpleados.Eliminar);

module.exports = rutas;