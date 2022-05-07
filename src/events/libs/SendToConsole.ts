import { Bot, Middleware } from 'mirai-js'
import moment from 'moment'


/**
 * 
 * @description 类型约束接口
*/
interface Types {
    messageChain: any[],
    sender: any
}


/**
 * 
 * @description 发送信息类
*/
export class SendConsoleClass<T extends Types> {
    constructor() {
    }
    /**
     * @description 发送信息函数
     * @param data T
     * @return Promise<T>
     * 
    */
    public sendToConsole(data: T): Promise<T> {
        return new Promise(async (resolve: any) => {
            try {
                let date: Date | string = new Date()
                date = moment(date).format("YYYY-MM-DD HH:mm:ss")
                let groupMsg = await new Promise((resolve: any) => {
                    let str: string = ""
                    data.messageChain.forEach((value: any) => {
                        switch (value.type) {
                            case "Source":
                                str += "Source: \nId: " + value.id + "\ntime: " + moment(value.time * 1000).format("YYYY-MM-DD HH:mm:ss") + "\n"
                                break
                            case "Quote":
                                str += "Quote: \nId: " + value.id + "\ngroupId: " + value.groupId + "\nsenderId: " + value.senderId + "\ntargetId: " + value.targetId + "\norigin: " + value.origin + "\n"
                                break
                            case "At":
                                str += "At: \ntargat: " + value.target + "\ndisapley: " + value.display + "\n"
                                break
                            case "Plain":
                                str += "Plain: " + value.text + "\n"
                                break
                            case "Face":
                                str += "Face: \nfaceId: " + value.faceId + "\nname: " + value.name + "\n"
                                break
                            case "AtAll":
                                str += "Atall\n"
                                break
                            case "At":
                                str += "At: " + value.target + "\ndisplay: " + value.display + "\n"
                                break
                            case "Image":
                                str += "Image: " + value.imageId + "\nurl: " + value.url + "\npath: " + value.path + "\nbase64: " + value.base64 + "\n"
                                break
                            case "FlashImage":
                                str += "FlashImage: " + value.imageId + "\nurl:" + value.url + "\npath: " + value.path + "\nbase64: " + value.base64 + "\n"
                                break
                            case "Voice":
                                str += "Voice: " + value.voiceId + "\nurl: " + value.url + "\npath: " + value.path + "\nbase64: " + value.base64 + "\nlength: " + value.length + "\n"
                                break
                            case "Xml":
                                str += "Xml: " + value.xml + "\n"
                                break
                            case "Json":
                                str += "Json: " + value.json + "\n"
                                break
                            case "App":
                                str += "App: " + value.content + "\n"
                                break
                            case "Poke":
                                str += "Poke: " + value.name + "\n"
                                str += "Xml: " + value.xml + "\n"
                                break
                            case "Json":
                                str += "Json: " + value.json + "\n"
                                break
                            case "App":
                                str += "App: " + value.content + "\n"
                                break
                            case "Poke":
                                str += "Poke: " + value.name + "\n"
                                break
                            case "Dice":
                                str += "Dice: " + value.value
                                break
                            case "MarketFace":
                                str += "MarketFace: \nId: " + value.id + "\nname: " + value.name + "\n"
                                break
                            case "MusicShare":
                                str += "MusicShare: \nKind: " + value.kind + "\ntitle: " + value.title + "\nsummary: " + value.summary + "\njumpUrl: " + value.jumpUrl + "\npicturUrl: " + value.pictureUrl + "\nmusicUrl: " + value.musicUrl + "\nbrief: " + value.brief + "\n"
                                break
                            case "File":
                                str += "File: \nId: " + value.id + "\nname: " + value.name + "\nsize: " + value.size
                                break
                            default:
                                break;
                        }
                    })
                    resolve(str)
                })
                resolve("[ At: " + date + " groupID: " + data.sender.group.id + " groupName: " + data.sender.group.name + "  senderID: " + data.sender.id + ", senderName: " + data.sender.memberName + " ]: \n" + groupMsg)
            } catch (err) {
                let date: Date | string = new Date()
                date = moment(date).format("YYYY-MM-DD HH:mm:ss")
                resolve("[ At: " + date + " groupID: " + data.sender.group.id + " groupName: " + data.sender.group.name + " senderID: " + data.sender.id + ", senderName: " + data.sender.memberName + " ]: \n" + err)
            }
        })
    }
}