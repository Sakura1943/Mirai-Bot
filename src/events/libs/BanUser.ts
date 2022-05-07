import redis from 'redis'
import { redisConfig } from "../../config/base"


/**
 * @description 类型集合
 */
interface Types {
    text: any
    sender: any
    subject: any
}

/**
 * @description 禁止用户出发次数函数
 * @param enable -> boolean
 * @param data -> T
 * @param bot -> T
 * @return Promise<void>
*/
export async function banUser<T extends Types>(enable: boolean, data: T, callback: Function): Promise<void> {
    if (enable) {
        let textArray: any[] = data?.text?.toString().trim().split(" ")
        if (textArray[0] === "&arch" || textArray[0] === "&music" || textArray[0] === "&help") {
            const client = redis.createClient({
                url: `redis://${redisConfig.redis.user}:${redisConfig.redis.password}@${redisConfig.redis.host}:${redisConfig.redis.port}/0`
            })
            await client.on('error', (err: any) => console.log(err))
            await client.connect()
            let status = await client.sendCommand(["CL.THROTTLE", `${data.sender.id}:${data.sender.group.id}`, "2", "1", "60", "1"])
            if ((<any[]>status)[0]) {
                console.log(`已禁止用户 ${data.sender.id}: ${data.sender.memberName} 使用`)
            } else {
                callback()
            }
        }
    } else {
        callback()
    }
}

export async function banNudge<T extends Types>(enable: boolean, data: T, callback: Function): Promise<void> {
    if (enable) {
        const client = redis.createClient({
            url: `redis://${redisConfig.redis.user}:${redisConfig.redis.password}@${redisConfig.redis.host}:${redisConfig.redis.port}/0`
        })
        await client.on('error', (err: any) => console.log(err))
        await client.connect()
        let status = await client.sendCommand(["CL.THROTTLE", `${data.subject.id}`, "2", "1", "60", "1"])
        if ((<any[]>status)[0]) {
            console.log(`已禁止群 ${data.subject.id} 使用`)
        } else {
            callback()
        }
    } else {
        callback()
    }
}