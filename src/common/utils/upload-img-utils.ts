import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"

export const imageInterceptor = FileInterceptor("file", {
    storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename(req, file, callback) {
            callback(null, Date.now() + "_" + file.originalname)
        },
    })
})

export const imagesInterceptor = FilesInterceptor("file", 20, {
    storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename(req, file, callback) {
            callback(null, Date.now() + "_" + file.originalname)
        },
    })
})