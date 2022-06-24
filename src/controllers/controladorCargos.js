const { validationResult } = require('express-validator');
const modeloCargo = require('../models/modeloCargo');
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloCargo.findAll();//findOne()
        console.log(lista);
        res.json(lista);
    }
    catch(error){
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
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { nombre, descripcion } = req.body;
        try {
            await modeloCargo.create({
                nombre: nombre,
                descripcion: descripcion,
            });
            msj.mensaje='Registro almacenado';
        } 
        catch (error) {
            msj.mensaje='Error al guardar los datos';
        }
            
    }
    res.json(msj);    
};
    
exports.Editar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { id } = req.query;
        const { nombre, descripcion } = req.body;
        try {
            var buscarCargo = await modeloCargo.findOne({
                where: {
                    id: id
                }
            });
            if(!buscarCargo){
                msj.mensaje='El id del registro no existe';
            }
            else{
                buscarCargo.nombre = nombre,
                buscarCargo.descripcion = descripcion
                await buscarCargo.save();
                msj.mensaje='Registro editado';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al editar los datos';
        }
            
    }
    res.json(msj);
};

exports.Eliminar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { id } = req.query;
        try {
            var buscarCargo = await modeloCargo.findOne({
                where: {
                    id: id
                }
            });
            if(!buscarCargo){
                msj.mensaje='El id del registro no existe';
            }
            else{
                await buscarCargo.destroy({
                    where: {
                        id: id
                    }
                });
                msj.mensaje='Registro eliminado';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al eliminar los datos';
        }
            
    }
    res.json(msj);
};