const { DataTypes } = require('sequelize');
const db = require('../configurations/db');
const Cargo = db.define(
    'Cargos', //Nombre de la tabla debe ser plural
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false

        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'cargos',
        timestamps: false //Para que no se genere la columna de fecha de creacion y actualizacion
    }
);
module.exports = Cargo;