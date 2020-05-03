import { Controller, Get, Req, Res } from '@nestjs/common'
import { createBundleRenderer } from 'vue-server-renderer'
import { Request, Response } from 'express'
import { join } from 'path'
const cheerio = require("cheerio")
const template = require('fs').readFileSync(join(__dirname, '../index.html'), 'utf-8')
const clientManifest = require('../vue-ssr-client-manifest.json')
const serverBundle = require("../vue-ssr-server-bundle.json")
@Controller('*')
export class RenderController {

    @Get()
    async getIndex(@Req() req: Request, @Res() res: Response): Promise<any> {
        // runtime已经打包进html 
        // 把清单的runtime去除
        clientManifest.initial = clientManifest.initial.filter((item: string, index: number) => {
            if (item.indexOf("runtime") === -1) {
                return item
            }
        });
        const renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template,
            clientManifest
        })
        const handleError = (err: any) => {
            if (err.url) {
                res.redirect(err.url)
            } else if (err.code === 404) {
                res.status(404).send('404 | Page Not Found')
            } else {
                res.status(500).send('500 | Internal Server Error')
                console.error(`error during render : ${req.url}`)
            }
        }
        renderer.renderToString({
            url: req.path
        }, (err, html) => {
            if (err) {
                return handleError(err)
            }
            const $ = cheerio.load(html)
            $("title").text(req.path)
            res.send($.html())
        })
    }
}
