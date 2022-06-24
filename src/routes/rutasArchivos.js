const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const storageEmpleados = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img/empleados'));

    },
    filename: function (req, file, cb){
        const nombreArchivo =   Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreArchivo + '-' + file.mimetype.replace('/', '.'));

    }
});
const uploadEmpleado = multer({storage: storageEmpleados});
const controladorArchivos = require('../controllers/controladorArchivos');
const rutas = Router();
rutas.post('/empleados/img', uploadEmpleado.single('img'), controladorArchivos.Recibir);




module.exports = rutas;