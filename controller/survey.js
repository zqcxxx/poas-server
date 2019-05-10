const Survey = require('../data/model/survey')
const Question = require('../data/model/question')
const Option = require('../data/model/option')
const Answer = require('../data/model/answer')

exports.getsurveys = async (ctx) => {
  try {
    let ary = []
    let params = ctx.params
    let pg = Number(params.pg)
    let num = Number(params.num)
    let ofs = (pg - 1) * num
    let data = await Survey.findAll({
      offset: ofs,
      limit: num,
      where: { status: 0 },
      order: [['id', 'DESC']]
    })
    for (let t of data) {
      ary.push(t.dataValues)
    }
    ctx.body = {
      status: 0,
      message: '获取成功',
      data: ary
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '获取失败',
      data: []
    }
  }
}

exports.delsurvey = async (ctx) => {
  try {
    let params = ctx.params
    let did = params.id
    let delsurvey = await Survey.findOne({
      where: { id: did }
    })
    delsurvey.status = 2
    delsurvey.save()
    ctx.body = {
      status: 0,
      message: '删除成功'
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '删除失败'
    }
  }
}

exports.addsurvey = async (ctx) => {
  try {
    let data = ctx.request.body
    let surtitle = data.title
    // 将问题id拼接成字符串
    let qid = (data.questionid).join(',')
    let dl = data.deadline
    // 创建问卷
    await Survey.create({
      survey_title: surtitle,
      ispublished: 1,
      question_id: qid,
      deadline: dl,
      status: 0
    })
    // 获取新建问卷id
    let sid = await Survey.max('id')
    // 创建问卷时同时将问卷问题、选项遍历存入Answer表中
    for (let q of data.questionid) {
      let que = await Question.findOne({
        where: { id: q }
      })
      // 判断是否是填空题  0：单选 1：多选 2：填空
      if (que.dataValues.question_type === 2) {
        continue
      }
      let opt = await Option.findAll({
        where: {
          question_id: q,
          status: 0
        }
      })
      // 遍历选项，将sid、qid、oid存入Answer表
      for (let o of opt) {
        let odata = o.dataValues
        await Answer.create({
          survey_id: sid,
          question_id: q,
          option_value: odata.id,
          pid: 0,
          status: 0
        })
      }
    }
    ctx.body = {
      status: 0,
      message: '添加成功'
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: error
    }
  }
}

exports.editsurvey = async (ctx) => {}

exports.publishsurvey = async (ctx) => {
  try {
    let params = ctx.params
    let sid = params.id
    let value = params.value
    let surdata = await Survey.findOne({
      where: { id: sid }
    })
    surdata.deadline = value
    surdata.ispublished = 0
    surdata.save()
    ctx.body = {
      status: 0,
      message: '修改成功'
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: error
    }
  }
}

exports.getsurvey = async (ctx) => {
  try {
    let params = ctx.params
    let sid = params.id
    let surdata = await Survey.findOne({
      where: { id: sid }
    })
    ctx.body = {
      status: 0,
      messgage: '查找成功',
      data: surdata
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '查找失败',
      data: []
    }
  }
}

exports.getsurveycount = async (ctx) => {
  try {
    let count = await Survey.count({
      where: { status: 0 }
    })
    ctx.body = {
      status: 0,
      message: '查询成功',
      data: count
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: error
    }
  }
}

exports.getcompletesurvey = async (ctx) => {
  try {
    // comsurvey分为三项，分别为单选题、多选题、填空题数据
    let comsurvey = [[], [], []]
    // sid问卷id
    let sid = ctx.params.id
    let surdata = await Survey.findOne({
      where: { id: sid }
    })
    // qid问卷题目id所组成的数组
    let qid = surdata.question_id.split(',')
    // 遍历所有问题的id
    for (let q of qid) {
      // qd 用来存每个问题的对象
      let qd = {}
      let sq = await Question.findOne({
        where: { id: q }
      })
      qd.id = sq.dataValues.id
      qd.title = sq.dataValues.question_title
      qd.options = []
      qd.type = sq.dataValues.question_type
      // 查找当前题目下所有的有效选项
      let sqo = await Option.findAll({
        where: { question_id: q, status: 0 }
      })
      for (let o of sqo) {
        let op = {}
        op.id = o.id
        op.value = o.option_value
        qd.options.push(op)
      }
      comsurvey[qd.type].push(qd)
    }
    ctx.body = {
      status: 0,
      message: '获取成功',
      data: comsurvey
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: error
    }
  }
}
