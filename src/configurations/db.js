const sequelize = require('sequelize');
const db = new sequelize(
    'sigres',
    'root',
    'Root0417',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);
module.exports = db;