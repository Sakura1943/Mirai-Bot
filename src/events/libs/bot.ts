import { Bot, Middleware } from 'mirai-js'
import { configContent, pluginsEnable, redisConfig } from '../../config/base'
import { SendGroupMessageClass, banNudge, banUser } from '../all'
import { petCommand } from '../../plugins/all'

/* TODO: `bot`实例创建 */
const bot: any = new Bot();


/**
 * `bot`主程序
 */
export async function botMain(): Promise<void> {
    /* bot实例开始 */
    await bot.open({
        baseUrl: configContent.host,
        verifyKey: configContent.verifyKey,
        qq: configContent.qq
    }).then(() => {
        console.log(`bot: ${configContent.qq} 已开启`)
    })
    /* 基础信息 */
    let baseUrl = configContent.host,
        verifyKey = configContent.verifyKey,
        password = "qweqwe123123"

    /* 配置自动登录 */
    await bot.on('BotOfflineEventForce',
        new Middleware()
            .autoReLogin(<Middleware.AutoReLoginOptions>{baseUrl, verifyKey, password})
            .done(() => {
                console.log('已自动登录')
            })
    );
    /* 监听群事件 */
    await bot.on("GroupMessage", new Middleware()
        .textProcessor()
        .done(async (data: any) => {
            await banUser(redisConfig.enable, data, ()=> {
                let Funcs: any = new SendGroupMessageClass<any>(bot, data)
                Funcs.archPackagesSearch(pluginsEnable.plugins.archPackagesSearch)
                Funcs.sendTest(pluginsEnable.plugins.sendTest)
                Funcs.netEaseSend(pluginsEnable.plugins.sendTest)
                Funcs.sendToConsole(pluginsEnable.events.sendToConsole)
                Funcs.getHelp(pluginsEnable.events.getHelp)
            })
        })
    )
    /* 戳一戳事件 */
    await bot.on("NudgeEvent", async (data: any) => {
        await banNudge(redisConfig.enable, data, async () => {
            await petCommand(pluginsEnable.events.petCommand, data, bot)
        })
    })
}