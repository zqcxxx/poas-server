const db = require('../db');
const seq = require('sequelize');

const Admin = db.defineModel('Admin', {
    username: seq.CHAR(255),
    password: seq.CHAR(255)
});

// 导出模型对象
module.exports = Admin;