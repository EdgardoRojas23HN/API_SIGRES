const { DataTypes } = require('sequelize');
const db = require('../configurations/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    'Usuarios', //Nombre de la tabla debe ser plural
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        login:{
            type: DataTypes.STRING(30),
            allowNull: false

        },
        empleado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contrasena:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        accesototal:{
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: false
        },
        habilitado:{
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: true
        },
        pin:{
            type: DataTypes.STRING(4),
            allowNull: false,
            defaultValue: '0000'
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: {
                msg: "El correo debe ser unico",
            }
        },
        estado:{
            type: DataTypes.ENUM('BL','AC','IN'),
            allowNull: true,
            defaultValue: 'AC'
        },
    },
    {
        tableName: 'usuarios',
        timestamps: false, //Para que no se genere la columna de fecha de creacion y actualizacion
        hooks:{
            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash;
            },      
            beforeUpdate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash;
            }      
        }
    }
);
Usuario.prototype.verificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
}
module.exports = Usuario;