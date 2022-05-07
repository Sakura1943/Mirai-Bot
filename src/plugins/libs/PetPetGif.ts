const petPetGif: any = require("pet-pet-gif")
import { configContent } from "../../config/base"

export async function petCommand(enable: boolean, data: any, bot: any) {
    if (enable) {
        if (data.target === configContent.qq) {
            let userIconUrl: string = `http://q4.qlogo.cn/g?b=qq&nk=${data.fromId}&s=160`
            let animatedGif: any = await petPetGif(userIconUrl)
            animatedGif = Buffer.from(animatedGif).toString("base64")
            await (<any>bot).sendMessage({
                group: data.subject.id,
                message: [
                    {
                        type: "Image",
                        base64: animatedGif
                    }
                ]
            })
        }
    }
}