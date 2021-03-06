import { Event } from "./core/event";
import { Configuration, TokenApi } from "@dustlight/auth-client-axios-js"
import { NotificationsApi, BasicNotification } from "@dustlight/messenger-client-axios-js"

interface Token {
    "access_token": string | undefined,
    "token_type": string | undefined,
    "expires_in": number | undefined,
    "scope": string | undefined,
    "jti": string | undefined,
    "expires_at": Date
    "isExpired": () => boolean
}

/**
 * 初始化钩子
 * 
 * @param config 配置
 */
function init(config: any) {

}

function processKey(obj: any) {
    if (!obj || !(obj instanceof Object))
        return 
    let keys = []
    for (let key in obj) {
        if (key.indexOf('.') > -1)
            keys.push(key)
        if (obj[key] instanceof Object)
            processKey(obj[key])
    }
    keys.forEach(key => {
        let val = obj[key]
        delete obj[key]
        let newKey = key.replace('.', '_')
        obj[newKey] = val
    })
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
    let data = event.data
    let header = data.customHeaders
    let variables = data.variablesAsMap

    let clientId = header.client_id
    let clientSecret = header.client_secret
    let channelId = variables.channel_id
    let templateId = variables.template_id
    let input = variables.notification_content

    let tokenApi = new TokenApi(new Configuration({
        basePath: config.api.auth,
        username: clientId,
        password: clientSecret
    }))
    return tokenApi.grantJws(null, "client_credentials")
        .then(accessToken => {
            let expirdAt = new Date(new Date().getTime() + accessToken.data["expires_in"] * 1000)
            let token: Token = {
                access_token: accessToken.data["access_token"],
                token_type: accessToken.data["token_type"],
                expires_in: accessToken.data["expires_in"],
                expires_at: expirdAt,
                scope: accessToken.data.scope + "",
                jti: accessToken.data["jti"],
                isExpired: () => new Date() > expirdAt
            }
            return token;
        })
        .then(token => {

            let c = new Configuration({
                basePath: config.api.messenger,
                accessToken: token.access_token
            })

            let notifyApi = new NotificationsApi(c)
            processKey(input)
            let notification: BasicNotification = {
                channelId: channelId,
                templateId: templateId,
                content: input
            }
            return notifyApi.createNotification(notification).then(res => res.data)
        })
}

export {
    main,
    init
}