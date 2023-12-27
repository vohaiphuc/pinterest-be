import * as compress_images from 'compress-images';

export const compress_img = (file: Express.Multer.File): Express.Multer.File => {
    compress_images(
        process.cwd() + "/public/img/" + file.filename,
        process.cwd() + "/public/img_compress/",
        { compress_force: false, statistic: true, autoupdate: true },
        false,

        { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );
    return file
}