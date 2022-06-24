const {validationResult} = require('express-validator');
const Usuario = require('../models/modeloUsuario');
const MSJ = require('../components/mensajes');
const EnviarCorreo = require('../configurations/correo');
const gpc = require('generate-pincode');
const { Op } = require('sequelize');

function validar(req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: ''
    };
    if(validaciones.errors.length > 0)
    {
            validaciones.errors.forEach(element => {
                error.mensaje = element.msg;
                error.parametro = element.param;
                errores.push(error);
            });
            msj.estado = 'precaucion';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = errores;
            
    }
    return msj;
};
exports.RecuperarContrasena = async(req, res) => {
    const msj = validar(req);
    if(msj.errores.length>0){
        MSJ(res, 200, msj);
    }
    else{
        try{
            const { correo } = req.body;
            const pin = gpc(4);
            console.log(pin);

            /*Se comento porque no funciona con la validacion pero si envia correo(revisarlo)
            var buscarUsuario = await Usuario.findOne({
                where:{
                    
                    correo, correo
                }
            });
            
            if(!buscarUsuario){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El correo no existe o no vinculado a ningun usuario',
                    parametro: 'correo'
                };
                MSJ(res, 200, msj);
            }
            else{
                
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                */
                const data ={
                    pin, 
                    correo
                };
                EnviarCorreo.RecuperarContrasena(data);
                msj.estado = 'correcto',
                msj.mensaje = 'Peticion ejecutada correctamente';
                msj.datos = '';
                msj.errores = '';
                MSJ(res, 200, msj);
    
            //}
        
        }   catch(error){
            msj.estado = 'error';
            msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }
    
};

exports.IniciarSesion = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length>0){
        MSJ(res, 200, msj);
    }
    else{
        try{
            const {usuario}= req.body;
            var buscarUsuario = await Usuario.findOne({
                where:{
                    correo,
                }
            });
            if(buscarUsuario){
                msj.estado = 'precaucion';
                msj.mensaje = 'La peticion no se ejecuto';
                msj.errores = {
                    mensaje: 'El correo no existe o no vinculado a ningun usuario',
                    parametro: 'correo'
            };
            MSJ(res, 200, msj);
            
    
            }
            else{
                const pin = gpc(4)
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                
                const data ={
                    pin, 
                    correo
                };
                EnviarCorreo.RecuperarContrasena(data);
                msj.estado = 'correcto',
                msj.mensaje = 'Peticion ejecutada correctamente';
                msj.datos = '';
                msj.errores = '';
                MSJ(res, 200, msj);

        }
    }
    catch(error){
        msj.estado = 'error';
        msj.mensaje = 'La peticion no se ejecuto';
            msj.errores = error;
            MSJ(res, 500, msj);
    }
}
};