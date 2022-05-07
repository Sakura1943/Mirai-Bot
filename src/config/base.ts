import fs from 'fs'
import { join } from 'path'

/* TODO: 读取config文件 */
let configContent: any = fs.readFileSync(join(__dirname, "../config/config.json")).toString()
configContent = JSON.parse(configContent).bot
/* TODO: 读取网易云配置文件 */
let netEaseContent: any = fs.readFileSync(join(__dirname, "../config/netease.json")).toString()
netEaseContent = JSON.parse(netEaseContent).netease

/**
 * TODO: 查询插件是否开启
*/
let pluginsEnable: any = fs.readFileSync(join(__dirname, "../config/plugins.json")).toString()
pluginsEnable = JSON.parse(pluginsEnable)

/**
 * TODO:redis 数据库信息
*/
let redisConfig: any = fs.readFileSync(join(__dirname, "../config/redis.json")).toString()
redisConfig = JSON.parse(redisConfig)

/**
 * 配置文件配置导出
 */
export {
    configContent,
    netEaseContent,
    pluginsEnable,
    redisConfig
}