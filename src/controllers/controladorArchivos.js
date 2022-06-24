const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const Empleado = require('../models/modeloEmpleado');
const MSJ = require('../components/mensajes')

exports.Recibir = async(req, res) => {
    console.log(req);
    const { filename  } = req.file;
    const {id} = req.body;
    try{
        

        var buscarEmpleado = await Empleado.findOne({
            where:{
                idregistro: id
            }
        });
        if(!buscarEmpleado){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + filename));
        if(buscarImagen){
            fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + filename));
            console.log('Imagen Eliminada');
        }
        res.send('El id del empleado no existe');
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreimagen));
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/empleados/' + buscarEmpleado.nombreimagen));
                console.log('Imagen Eliminada');
            } 
            buscarEmpleado.nombreimagen= filename;
            await buscarEmpleado.save()
            .then((data)=>{
                res.json(data);
            })
            .catch((error) =>{
                res.json(error);
            });

        }
        
    }
    catch(error){
        res.json(error);
    }
    
};