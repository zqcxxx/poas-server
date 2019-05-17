const path = require('path')
CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')

const Admin = require('../data/model/admin')
const secret = 'poas_secret'

// 登陆功能
exports.login = async (ctx) => {
  let postData = ctx.request.body
  let postname = postData.username
  let postpwd = postData.password
  let querydata = await Admin.findOne({
    where: {
      username: postname
    },
    attributes: ['password']
  })
  if (querydata) {
    if (querydata.dataValues.password === postpwd) {
      let payload = {
        username: postname,
        admin: true
      }
      ctx.body = {
        status: 0,
        message: '登陆成功',
        token: jsonwebtoken.sign(
          payload,
          secret,
          // 设置 token 过期时间
          { expiresIn: '4h' }
        )
      }
    } else {
      ctx.body = {
        status: 1,
        message: '密码错误'
      }
    }
  } else {
    ctx.body = {
      status: 1,
      message: '无此用户'
    }
  }
}

exports.getinfo = async (ctx) => {
  try {
    let auth = ctx.request.header.authorization
    let token = auth.split(' ')[1]
    let decoded = jsonwebtoken.verify(token, secret)
    let info = await Admin.findOne({
      where: { username: decoded.username }
    })
    ctx.body = {
      status: 0,
      message: '获取成功',
      data: info
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '获取失败'
    }
  }
}

exports.logout = async (ctx) => {
  try {
    ctx.body = {
      status: 0,
      message: '退出成功'
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '退出失败'
    }
  }
}
