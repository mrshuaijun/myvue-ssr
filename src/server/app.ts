import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './modules/app.module'
import { configure, getLogger } from 'log4js'
import { join } from 'path'
const favicon = require('serve-favicon')
import { AllExceptionsFilter } from './middlewares/catchError'
async function start() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 处理静态资源
    app.useStaticAssets(join(__dirname, './', 'static'), {
        prefix: '/static/',
    })
    // 处理ico图标
    app.use(favicon(join(__dirname, './favicon.ico')))
    // 处理服务器错误
    configure({
        appenders: { cheese: { type: 'file', filename: __dirname + '/logs/err.log' } },
        categories: { default: { appenders: ['cheese'], level: 'error' } }
    });
    const logger = getLogger('cheese')
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.listen(3000);
}
start();
