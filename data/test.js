const test = '[{"value": "2"}, {"value": "3"}, {"value": "4"}]'
const b = {
    "title": "测试",
    "type": "0",
    "options": "[{\"value\":\"33\"},{\"value\":\"42\"},{\"value\":\"22\"}]"
}

const json = JSON.parse(test)

console.log(json)