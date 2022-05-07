import {netEaseContent} from "../../config/base"

import { login_cellphone, search, song_url, album } from 'NeteaseCloudMusicApi'

/**
 * @description 函数集合接口
 * */
interface getInfoFunc {
    login(): Promise<void>
    GetMusicId(keyword: string): Promise<boolean | number>
    GetArtistName(keyword: string): Promise<string>
    GetMusicUrl(mid: number | boolean): Promise<string>
    GetMusicName(keyword: string): Promise<string>
    GetAlbumID(keyword: string): Promise<number>
    GetAlbumPic(albumID: number): Promise<string>
}

/**
 * @description 函数集合
 * */
let FunctionCollections: getInfoFunc = <getInfoFunc>{
    /**
     * @description 登录
     * @return Promise<void>
     */
    login: async(): Promise<void> => {
        await login_cellphone(netEaseContent)
    },
    /**
     * @description 获取歌曲id
     * @param keyword 关键字
     * @return Promise<string | boolean | number>
     */
    GetMusicId: async (keyword: string): Promise<boolean | number> => {
        return new Promise(async (resolve: any) => {
            let result: any = await search({
                keywords: keyword
            })
            if (result.body.result.songs !== undefined) {
                resolve(result.body.result.songs[0].id)
            } else {
                resolve(false)
            }
        })
    },
    /**
     * @description 获取歌手名
     * @param keyword 关键字
     * @return Promise<string | boolean | number>
     */
    GetArtistName: async (keyword: string): Promise<string> => {
        return new Promise(async (resolve: any) => {
            let result: any = await search({
                keywords: keyword
            })
            resolve(result.body.result.songs[0].artists[0].name)
        })
    },
    /**
     * @description 获取歌曲地址
     * @param mid 歌曲id
     * @return Promise<string | boolean | number>
     */
    GetMusicUrl: (mid: number): Promise<string> => {
        return new Promise(async (resolve: any) => {
            let result: any = await song_url({
                id: mid,
                br: 320000
            })
            resolve(result.body.data[0].url)
        })
    },
    /**
     * @description 获取歌曲名
     * @param keyword 关键字
     * @return Promise<string | boolean | number>
     */
    GetMusicName: (keyword: string): Promise<string> => {
        return new Promise(async (resolve: any) => {
            let result: any = await search({
                keywords: keyword
            })
            resolve(result.body.result.songs[0].name)
        })
    },
    /**
     * @description 获取专辑ID
     * @param keyword 关键字
     * @return Promise<string | boolean | number>
     */
    GetAlbumID: (keyword: string): Promise<number> => {
        return new Promise(async (resolve: any) => {
            let result: any = await search({
                keywords: keyword
            })
            resolve(result.body.result.songs[0].album.id)
        })
    },
    /**
     * @description 获取专辑ID
     * @param albumID 专辑id
     * @return Promise<string | boolean | number>
     */
    GetAlbumPic: (albumID: number): Promise<string> => {
        return new Promise(async (resolve: any) => {
            let result: any = await album({
                id: albumID
            })
            resolve(result.body.album.picUrl)
        })
    }
}

/**
 * @description 音乐信息接口 All String
 */
interface MusicInformation {
    type?: string,
    kind?: string,
    title?: string,
    summary?: string,
    jumpUrl?: string
    pictureUrl?: string,
    musicUrl?: string,
    brief?: string
}

export class SendMusicShareBoxClass {
    bot?: any
    data?: any
    constructor(private info?: MusicInformation) {
    }
    public async send(key: string, data: any, bot: any): Promise<void> {
        // await FunctionCollections.login()
        this.bot = bot
        this.data = data
        if (this.bot !== undefined && this.bot !== null && this.bot !== ""
            && this.data !== undefined && this.data !== null && this.data !== "") {
            let musicID: number | boolean = await FunctionCollections.GetMusicId(key)
            if(musicID) {
                let singer: string = await FunctionCollections.GetArtistName(key)
                let albumID: number | boolean = await FunctionCollections.GetAlbumID(key)
                let picUrl: string = await FunctionCollections.GetAlbumPic(albumID)
                let musicName: string = await FunctionCollections.GetMusicName(key)
                let musicUrl: string = await FunctionCollections.GetMusicUrl(musicID)
                this.info = {
                    type: "MusicShare",
                    kind: "NeteaseCloudMusic",
                    title: musicName,
                    summary: singer,
                    jumpUrl: `https://y.music.163.com/m/song?id=${musicID}&uct=tr9P7qmczyBI7Yoc9qSVKA%3D%3D&app_version=8.7.32`,
                    pictureUrl: picUrl,
                    musicUrl: musicUrl,
                    brief: `[分享]${singer} - ${musicName}`
                }
                await bot.sendMessage({
                    group: data.sender.group.id,
                    message: [
                        this.info
                    ]
                })
            } else {
                await bot.sendMessage({
                    group: data.sender.group.id,
                    message: [
                        { type: 'Plain', text: `未找到与 ${key} 相关的歌曲` }
                    ]
                })
            }
        } else {
            await bot.sendMessage({
                group: data.sender.group.id,
                message: [
                    { type: 'Plain', text: `输入参数错误` }
                ]
            })

        }
    }
}