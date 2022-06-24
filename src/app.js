const express = require('express');
const morgan = require('morgan');
const path  = require('path');
require('dotenv').config();//esto tiene que estar antes de iniciar el servidor (es el paquete para correo)
const app = express();
app.set('port',3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/',require('./routes'));
app.use('/api/img/', express.static(path.join(__dirname, 'public/img')));
app.use('/api/cargos',require('./routes/rutasCargos'));
app.use('/api/usuarios',require('./routes/rutasUsuarios'));
app.use('/api/empleados',require('./routes/rutasEmpleados'));
app.use('/api/autenticacion',require('./routes/rutasAutenticacion'));
app.use('/api/archivos',require('./routes/rutasArchivos'));
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en el puerto " + app.get('port'));
})