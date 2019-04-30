// let a = {
//     title: '你觉得食堂饭菜怎样',
//     type: '0',
//     options: [
//         {
//             values: '好'
//         },{
//             values: '不好'
//         }
//     ]
// }

// console.log('a type', typeof a, a)


// let b = JSON.stringify(a)

// console.log('b type', typeof b, b)


// let c = JSON.parse(b)

// console.log('c type', typeof c, c)

// const axios  = require('axios')

// axios({
//     method: 'post',
//     url: 'localhost:3000/question/addquestions',
//     data: {
//         title: '你觉得食堂饭菜怎样',
//         type: '0',
//         options: [
//             {
//                 values: '好'
//             },{
//                 values: '不好'
//             }
//         ]
//     }
//   }).then(res => {
//       console.log(res)
//       return
//   }).catch(e => console.log(e))

let a = '["好","不好"]'
let c = '[{ "id" : 11 , "values" : "满意" }, { "id" : 12 , "values" : "不满意"}]'

let b = JSON.parse(c)

console.log(typeof b)
console.log(b)


[

    ​		{
    
    ​			"id": 11,
    
    ​			"values" : "满意"
    
    ​		},
    
    ​		{
    
    ​			"id": 12,
    
    ​			"values": "不满意"
    
    ​		}
    
    ​	]


