import { Event } from "./core/event";

/**
 * 初始化钩子
 * 
 * @param config 配置
 */
function init(config: any) {
    console.log(config);
}

/**
 * 函数入口
 * 
 * @param event 事件
 * @param context 上下文
 * @param config 配置
 * @returns 
 */
function main(event: Event, context: any, config: any): any {
    let result = {}
    result["date"] = new Date()
    result["event.data"] = event.data
    result["query"] = event.extensions.request.query
    result["context"] = context
    return result
}

export {
    main,
    init
}