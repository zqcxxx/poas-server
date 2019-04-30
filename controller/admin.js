const path = require('path');
CryptoJS = require("crypto-js");
const jsonwebtoken = require('jsonwebtoken')

const Admin =  require('../data/model/admin');
const secret = 'poas_secret'


exports.login = async ( ctx ) => {
    let postData = ctx.request.body;
    let postname = postData.username;
    let postpwd =  postData.password;
    let querydata = await Admin.findOne({
        where: {
            username: postname,
        },
        attributes: ['password']
    })
    if( querydata ){
        if(querydata.dataValues.password === postpwd){
            ctx.body = {
                status: '0',
                message: '登陆成功',
                token: jsonwebtoken.sign({
                    data: postname,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, secret),
            }
        }else {
            ctx.body = {
                status: '1',
                message: '密码错误'
            }
        }
    }else {
        ctx.body = {
            status: '1',
            message: '无此用户'
        }
    }
}

exports.getinfo = async (ctx) => {
    try {
        let params = ctx.request.params;
        let token = params.token;
        let data = await Admin.findOne({
            where: { username : token}
        })
    } catch (error) {
        
    }
}
