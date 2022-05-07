import { fstat } from "fs";
import { Message, Middleware } from "mirai-js";
import { ArchLinuxPackageInfoSearchClass, SendMusicShareBoxClass } from "../../plugins/all";
import { SendConsoleClass, HelpContent } from '../all'
import fs from 'fs'
import { join } from 'path'
import moment from "moment"

/**
 * @description 导出发送群组信息类
 */
export class SendGroupMessageClass<T> {
    static archPackagesSearch() {
        throw new Error('Method not implemented.');
    }
    bot?: T
    data: any
    constructor(bot: T, data: any) {
        this.bot = bot
        this.data = data
    }
    /**
     * @description 测试消息
     */
    public sendTest(enable: boolean) {
        if (enable) {
            this.data.messageChain.map(async (value: any) => {
                if (value?.type === 'Plain' && value?.text?.indexOf("&测试") !== -1) {
                    await (<any>this.bot)?.sendMessage({
                        group: this.data.sender.group.id,
                        message: new Message().addText("测试")
                    })
                }
            })
        }
        return this
    }

    /**
     * @description arch包信息查询
     * */
    public archPackagesSearch(enable: boolean): Promise<any> {
        return new Promise(async (resolve: any) => {
            if (enable) {
                let textArray: any[] = this.data?.text?.toString().trim().split(" ")
                if (textArray[0] === "&arch") {
                    if (textArray.length > 1) {
                        let packageName: string = textArray[1]
                        let ArchPackageInfosSearchObject = await new ArchLinuxPackageInfoSearchClass()
                        await ArchPackageInfosSearchObject.GetInfos(packageName, this.data, this.bot)
                        await ArchPackageInfosSearchObject.send()
                    }
                }
                resolve(this)
            }
        })
    }
    /**
     * @description 网易音乐分享
     * */
    public netEaseSend(enable: boolean): Promise<any> {
        return new Promise(async (resolve: any) => {
            if (enable) {
                let textArray: any[] = this.data?.text?.toString().trim().split(" ")
                if (textArray[0] === "&music") {
                    if (textArray.length > 1) {
                        let text: string = textArray.slice(-textArray.length - 1).join(" ")
                        await new SendMusicShareBoxClass().send(text, this.data, this.bot)
                    }
                }
                resolve(this)
            }    
        })
    }
    /**
     * @description 发送信息到控制台并保存到文件
    */
    public sendToConsole(enable: boolean): Promise<any> {
        return new Promise(async (resolve: any) => {
            if (enable) {
                let result: any = await new SendConsoleClass().sendToConsole(this.data)
                console.log(result)
                let dateNow: Date | string = new Date()
                dateNow = moment(dateNow).format("YYYY-MM-DD")
                if (!fs.existsSync(join(__dirname, "../data"))) {
                    fs.mkdirSync(join(__dirname, "../data"))
                }
                let userDate: Date | string = new Date()
                userDate = moment(userDate).format("HH:mm:ss")
                let content: string = `[${userDate}]
message=\"${result}\"
`
                fs.writeFileSync(join(__dirname, `../data/${dateNow}.ini`), content, { flag: "a+" })
            }
            resolve(this)
        })
    }
    /**
     * @description 获取帮助
     * @param enable -> boolean
     * @return Promise<any>
    */
    public getHelp(enable: boolean): Promise<any> {
        return new Promise(async (resolve: any) => {
            if (enable) {
                if (enable) {
                    let textArray: any[] = this.data?.text?.toString().trim().split(" ")
                    if (textArray[0] === "&help") {
                        if (textArray.length = 1) {
                            await (<any>this.bot).sendMessage({
                                group: this.data.sender.group.id,
                                message: [
                                    { type: "Plain", text: HelpContent }
                                ]
                            })
                        }
                    }
                    resolve(this)
                }
            }
        })
    }
}
