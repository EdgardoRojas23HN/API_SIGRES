const { validationResult } = require('express-validator');
exports.Inicio = (req, res) => {
    const listaModulos = [
        {modulo: "empleados", ruta: "/api/empleados"},
        {modulo: "clientes", ruta: "/api/clientes"},
    ];
    const msj = {
        api: "API-SIGRES",
        description: "Interfaces de programacion para el sistema de gestion de restaurantes",
        propietario: "DESOFIW",
        desarrollador: "Elvis Alfaro",
        colaboratores: "Ing Carlos Flores",
        listaModulos,
    };
    res.json(msj);
};
exports.ejemploPost = (req, res) => {
    //console.log(req.body);
    //const { usuario, contraseña } = req.body;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const usuario2 = req.body.usuario;
    const contraseña2 = req.body.contraseña;
    console.log(usuario2);
    console.log(contraseña2);
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!usuario2 || !contraseña2) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};
exports.ejemploPut = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    //console.log(req);
    const { id } = req.query.id;
    console.log(id);
    //const { usuario, contraseña } = req.body;
    const usuario2 = req.body.usuario;
    const contraseña2 = req.body.contraseña;
    console.log(usuario2);
    console.log(contraseña2);
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!usuario2 || !contraseña2) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};

exports.ejemploDelete = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    //console.log(req);
    const { id } = req.query.id;
    console.log(id);
    //const { usuario, contraseña } = req.body;
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!id) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};