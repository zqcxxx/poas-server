const Question = require('../data/model/question')
const Option = require('../data/model/option')

exports.addquestions = async (ctx) => {
  try {
    let data = ctx.request.body
    let title = data.title
    let type = data.type
    let options = data.options
    await Question.create({
      question_title: title,
      question_type: type,
      status: 0
    })
    let id = await Question.max('id')
    if (options) {
      for (let t of options) {
        await Option.create({
          question_id: id,
          option_value: t.value,
          status: 0
        })
      }
    }
    ctx.body = {
      status: 0,
      message: '添加成功'
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      status: 1,
      message: '添加失败，请重试'
    }
  }
}

exports.delete = async (ctx) => {
  try {
    let params = ctx.params
    let did = params.id
    let delquestion = await Question.findOne({
      where: { id: did }
    })
    delquestion.status = 2
    delquestion.save()
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

exports.getquestions = async (ctx) => {
  try {
    let ary = []
    let params = ctx.params
    let pg = Number(params.pg)
    let num = Number(params.num)
    let amount = (pg - 1) * num
    let data = await Question.findAll({
      offset: amount,
      limit: num,
      where: { status: 0 }
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

exports.getoptions = async (ctx) => {
  try {
    let ary = []
    let qid = Number(ctx.params.id)
    let opt = await Option.findAll({
      where: {
        question_id: qid,
        status: 0
      }
    })
    for (let t of opt) {
      ary.push(t.dataValues)
    };
    ctx.body = {
      status: 0,
      message: '查找成功',
      data: ary
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '查找失败',
      data: []
    }
  }
}

exports.editquestions = async (ctx) => {
  try {
    let data = ctx.request.body
    let qid = Number(data.id)
    let editque = await Question.findOne({
      where: { id: qid }
    })
    editque.question_title = data.title
    editque.question_type = data.type
    editque.save()
    let opt = data.options
    for (let t of opt) {
      if (t.id) {
        let editopt = await Option.findOne({
          where: { id: t.id }
        })
        editopt.option_value = t.value
        editopt.save()
      } else {
        await Option.create({
          question_id: qid,
          option_value: t.value,
          status: 0
        })
      }
    }
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

exports.getquestioncount = async (ctx) => {
  try {
    let count = await Question.count({
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
      message: '查询失败'
    }
  }
}

exports.getallquestions = async (ctx) => {
  try {
    let arr = []
    let ques = await Question.findAll({
      where: { status: 0 }
    })
    for (let q of ques) {
      arr.push(q.dataValues)
    }
    ctx.body = {
      status: 0,
      message: '查找成功',
      data: arr
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: error
    }
  }
}
