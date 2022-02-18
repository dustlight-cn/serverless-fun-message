'use strict';

const main = require('./build/main') // 入口
const config = require("./config") // 配置

main.init(config) // 初始化

/**
 * 判断对象是否 Promise 对象
 * 
 * @param {*} value 
 * @returns 
 */
function isPromise(value) {
  return value && Object.prototype.toString.call(value) === "[object Promise]";
}

exports.handler = async (event, context) => {
  try {
    var result = main.main(event, context, config);

    if (isPromise(result)) {
      result = await result.then()
    }

    if (typeof result == "object")
      return JSON.stringify({
        "result": "COMPLETE",
        "variables": result
      })
    if (result == null)
      return JSON.stringify({
        "result": "COMPLETE",
        "variables": null
      })
    return JSON.stringify({
      "result": "COMPLETE",
      "variables": {
        "result": result
      }
    })
  } catch (e) {
    console.error(e);
    if (e.type == "FAIL") {
      return JSON.stringify({
        "result": "FAIL",
        "errorMessage": e.message,
        "retires": e.retires
      })
    }
    return JSON.stringify({
      "result": "ERROR",
      "errorCode": e.code || 0,
      "errorMessage": e.message
    })
  }
};
