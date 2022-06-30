const { validationResult } = require('express-validator');
const Usuario = require('../models/modeloUsuario');
const modeloUsuario = require('../models/modeloUsuario');

exports.Listar = async (req, res) => {
    try {
        const Lista = await modeloUsuario.findAll();
        console.log(Lista);
        res.json(Lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }


};
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);

    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    }
    else {
        const { login,empleado,contrasena,accesototal,habilitado,pin,fallidos,correo,estado } = req.body;
        const buscarLogin = await modeloUsuario.findOne({    //Aqui agregamos el await (revisarlo)
            where: {
                login: login
            }
        });
        const buscarCorreo = await modeloUsuario.findOne({ //Aqui agregamos el await (revisarlo)
            where: {
                correo: correo
            }
        });

        //con la validacion no funciona al momento de guardarlo (revisarlo despues)
        if (buscarLogin == login) {
            msj.mensaje = 'El login ya existe!!';
            }
        else if(buscarCorreo == correo){
            msj.mensaje = 'El correo ya existe!';
            }

        else{

        try {

                await modeloUsuario.create(
                    {
                        login:login,
                        empleado:empleado,
                        contrasena:contrasena,
                        accesototal:accesototal,
                        habilitado:habilitado,
                        pin:pin,
                        fallidos:fallidos,
                        correo:correo,
                        estado:estado
                    });
                msj.mensaje = 'Registro almacenado';
           
        }
             catch (error) {
                msj.mensaje = 'Error al guardar los datos';
                //console.log(error)
                //msj.mensaje = 'Error al guardar los datos'
            }
            
        }

    }
    res.json(msj);
    
};

exports.Editar = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        const { login, empleado, contrasena, accesototal, habilitado, pin, fallido, correo, estado } = req.body;

        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarUsuario) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
            
                buscarUsuario.login= login;
                buscarUsuario.empleado = empleado;
                buscarUsuario.contrasena = contrasena ;
                buscarUsuario.accesototal = accesototal ;
                buscarUsuario.habilitado = habilitado ;
                buscarUsuario.pin = pin;
                buscarUsuario.fallido = fallido;
                buscarUsuario.correo = correo;
                buscarUsuario.estado = estado;
                await buscarUsuario.save(); 
                msj.mensaje = 'Registros actualizado';

            }
        } catch (error) {
            msj.mensaje = 'Error al editar los datos';

        }
    }
    res.json(msj);
};

exports.Eliminar = async(req, res)=> {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarUsuario) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{                
                await modeloUsuario.destroy({
                    where: 
                    {
                        id:id
                    }
                });
                msj.mensaje = 'Registros  Eliminado';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';

        }
    }
    res.json(msj);
 };
