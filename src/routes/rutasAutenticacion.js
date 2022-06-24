const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorAutenticacion = require('../controllers/controladorAutenticacion');
const rutas = Router();
rutas.post('/recuperar',  //controladorAutenticacion.recuperarContrasena
body ('correo')
.notEmpty().withMessage('No se aceptan valores vacios para el correo del usuario')

.isEmail().withMessage('El correo debe ser valido'),
controladorAutenticacion.RecuperarContrasena); //revisar si aqui no se necesita un parentesis *****

rutas.post('/iniciarsesion',  
body ('usuario')
.notEmpty().withMessage('No se aceptan valores vacios para el  usuario'),
controladorAutenticacion.IniciarSesion); 

//modulo autenticacion
module.exports = rutas;