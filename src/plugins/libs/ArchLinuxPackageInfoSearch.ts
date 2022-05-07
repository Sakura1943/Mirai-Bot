import axios from "axios"
import moment from 'moment'


/**
 * 处理个数大于5的信息
 * @param data: any
 * @return Promise<string> 处理好的信息
 */
function getGreaterFiveInfo(data: any[]): Promise<string> {
    return new Promise<string>((resolve: any) => {
        try {
            let listStr: string = ""
            data.map((value: any, index: number) => {
                if (index < 5) {
                    listStr += data[index] + " "
                } else if (index === 5) {
                    listStr += "..."
                } else {
                    listStr += ""
                }
            })
            resolve(listStr)
        } catch (err) {
            console.log(err)
        }
    })
}

/**
 * 包信息接口
 */
interface PackageInfo {
    packageRepo?: string
    packageNames?: string
    packageVersion?: string
    packageRel?: string
    packageDesc?: string
    packageUrl?: string
    packageLastUpdate?: string
    packageMaintainer?: string
    packageDepends?: string
}

/**
 * @description 包信息查询类
 */
export class ArchLinuxPackageInfoSearchClass{
    content?: string
    bot?: any
    data?: any
    constructor(private info?: PackageInfo) {
    }
    /**
     * @description 获取信息到info
     * @param key 包名
     * @param data bot获取的数据
     * @param bot bot实例
     * @return string
     */
    public async GetInfos(key: string, data: any, bot: any): Promise<void> {
        this.bot = bot
        this.data = data
        let result: any = await axios.get(`https://archlinux.org/packages/search/json/?name=${key}`)
        if (result.data.results.length == 0) {
            await bot.sendMessage({
                group: data.sender.group.id,
                message: [
                    { type: 'Plain', text: `未查询到包: ${key}` }
                ]
            })
        } else {
            let results: any = result.data.results[0]
            this.info = {
                packageRepo: results.repo,
                packageNames: results.pkgname,
                packageVersion: results.pkgver,
                packageRel: results.pkgrel,
                packageDesc: results.pkgdesc,
                packageUrl: results.url,
                packageLastUpdate: moment(results.last_update).format("LLLL"),
                packageDepends: await getGreaterFiveInfo(results.depends),
                packageMaintainer: await getGreaterFiveInfo(results.maintainers)
            }
            this.content = `仓库: ${this.info.packageRepo}
包名: ${this.info.packageNames}
版本: ${this.info.packageVersion}-${this.info.packageRepo}
描述: ${this.info.packageDesc}
打包者: ${this.info.packageMaintainer}
依赖: ${this.info.packageDepends}
上游: ${this.info.packageUrl}
最近更新: ${this.info.packageLastUpdate}`
        }
    }
    /**
     * @description 发送信息
     */
    public async send() {
        if (this.bot !== undefined && this.bot !== null && this.bot !== ""
            && this.data !== undefined && this.data !== null && this.data !== ""
            && this.content !== undefined && this.content !== null && this.content !== "") {
            await this.bot.sendMessage({
                group: this.data.sender.group.id,
                message: [
                    { type: 'Plain', text: this.content }
                ]
            })
        } else {
            console.log("请先执行GetInfos方法")
        }
    }
}
