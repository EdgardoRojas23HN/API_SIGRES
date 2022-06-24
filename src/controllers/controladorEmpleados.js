const { validationResult } = require('express-validator');
const modeloCargo = require('../models/modeloCargo');
const modeloEmpleado = require('../models/modeloEmpleado');
const { Op } = require('sequelize');

exports.Listar = async (req, res) => {
    var msj = {
        mensaje: ''
    }
    try {
        
        const Lista = await modeloEmpleado.findAll({
            /*//codigo comentado por que no funciono la prueba  (revisarlo)
            attributes: ['nombre','apellido'],
            include: [{
                model: modeloCargo,
                attributes: ['nombre'],
                where: {
                    nombre: {[Op.like]: 'C%'}
                }
            }], //codigo detenido hasta aqui*/
            // where : {
            //     empleado: {[Op.like]: 'C%'}
            //     //[Op.like]: 'C'
            //     /* [Op.and]:[ //Op.and: para comparar dos valores
            //         //salario:{[Op.gte]: 10000}   //Op.gte: mayor o igual 
            //         //salario:{[Op.lt]: 10000}   //salario menor a 10000
            //     ] */
                
            //     //salario: 1000
            //     //cargos_id:1
            // }
       
       
       
        });
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

    } else {
        const { identidad,nombre, apellido, cargos_id, fechaingreso, salario, imagen } = req.body;

        try {
            await modeloEmpleado.create(
                {
                    identidad: identidad,
                    nombre: nombre,
                    apellido: apellido,
                    fechaingreso:fechaingreso,
                    cargos_id:cargos_id,
                    salario:salario,
                    imagen:imagen
                });
            msj.mensaje = 'Registro almacenado';

        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';

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
        const { identidad,nombre, apellido, fechaingreso, cargos_id, salario, imagen } = req.body;

        try {
            var buscarEmpleado = await modeloEmpleado.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarEmpleado) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
                buscarEmpleado.identidad = identidad;
                buscarEmpleado.nombre = nombre;
                buscarEmpleado.apellido = apellido ;
                buscarEmpleado.fechaingreso = fechaingreso ;
                buscarEmpleado.cargos_id = cargos_id ;
                buscarEmpleado.salario = salario ;
                buscarEmpleado.imagen = imagen;
                await buscarEmpleado.save(); 
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
            var buscarEmpleado = await modeloEmpleado.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarEmpleado) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{                
                await modeloEmpleado.destroy({
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
