// 引入模块
const Sequelize = require('sequelize');
// 读取配置
const mysqlConfig = require('../configs/mysql-config');

// 根据配置实例化seq
let seq = new Sequelize(mysqlConfig.dbname, mysqlConfig.username, mysqlConfig.userpwd, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool
});


//测试数据库是否连接成功
seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  /**
 * 定义数据模型
 * 
 * @param {any} name 模型名称【数据库表名】
 * @param {any} attributes 数据字段集合
 * @returns 数据模型对象
 */
function defineModel (name, attributes) {
    var attrs = {};

    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }

    // 附加公共字段
    // attrs.id = {
    //     type: ID_TYPE,
    //     primaryKey: true
    // };
    attrs.createAt = {
        type: Sequelize.DATE,
        allowNull: false
    };
    attrs.updateAt = {
        type: Sequelize.DATE,
        allowNull: false
    };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // 状态：0表示有效，1表示无效，2表示已删除，默认为0.
    attrs.status = {
        type: Sequelize.INTEGER,
        allowNull: false
    };
    
     // 调用seq的方法定义模型并返回
    return seq.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    obj.updateAt = now;
                    ++obj.version;
                }
            }
        }
    });
}

exports.defineModel = defineModel;
